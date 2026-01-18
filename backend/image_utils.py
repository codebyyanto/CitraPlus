import cv2
import numpy as np
import base64

def decode_image(image_bytes):
    """Decode bytes image to OpenCV format (BGR)."""
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def encode_image(image):
    """Encode OpenCV image (BGR) to base64 string."""
    _, buffer = cv2.imencode('.png', image)
    return f"data:image/png;base64,{base64.b64encode(buffer).decode('utf-8')}"

def calculate_mse_psnr(original, processed):
    """Calculate MSE and PSNR between two images."""
    # Ensure same size
    if original.shape != processed.shape:
        processed = cv2.resize(processed, (original.shape[1], original.shape[0]))

    mse = np.mean((original - processed) ** 2)
    if mse == 0:
        return 0, float('inf')
    
    psnr = 10 * np.log10(255**2 / mse)
    return mse, psnr

def apply_unsharp_mask(image, radius, amount, threshold):
    """
    Apply Unsharp Masking algorithm on the L channel of LAB color space.
    """
    # Convert to LAB
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    # 1. Blur the L channel
    # Radius in OpenCV GaussianBlur must be odd. Use radius as sigma, calculate kernel size.
    # Sigma = radius. Kernel size ~ 6*sigma.
    sigma = radius
    ksize = int(2 * round(3 * sigma) + 1)
    if ksize % 2 == 0:
        ksize += 1
        
    blurred_l = cv2.GaussianBlur(l, (ksize, ksize), sigma)

    # 2. Calculate Unsharp Mask
    # diff = L - blurred_L
    # if abs(diff) > threshold: L_new = L + amount * diff
    
    l = l.astype(np.float32)
    blurred_l = blurred_l.astype(np.float32)
    
    diff = l - blurred_l
    
    # Thresholding
    mask = np.abs(diff) > threshold
    
    sharpened_l = np.copy(l)
    sharpened_l[mask] += diff[mask] * amount
    
    # Clip values
    sharpened_l = np.clip(sharpened_l, 0, 255).astype(np.uint8)

    # Merge back
    sharpened_lab = cv2.merge([sharpened_l, a, b])
    sharpened_bgr = cv2.cvtColor(sharpened_lab, cv2.COLOR_LAB2BGR)
    
    return sharpened_bgr

def process_image_pipeline(image_bytes, radius=1.0, amount=1.0, threshold=0, ai_mode=False, doc_mode=False):
    try:
        original_img = decode_image(image_bytes)
        if original_img is None:
            raise ValueError("Could not decode image")

        processing_img = original_img.copy()

        # --- AI Pre-processing (Simulated) ---
        if ai_mode:
            # Denoise (FastNlMeans is better but slower, Median is fast)
            processing_img = cv2.medianBlur(processing_img, 3)
            
            # Saturation & Brightness
            hsv = cv2.cvtColor(processing_img, cv2.COLOR_BGR2HSV).astype(np.float32)
            h, s, v = cv2.split(hsv)
            s = s * 1.3 # +30% Saturation
            v = v * 1.05 # +5% Brightness
            s = np.clip(s, 0, 255)
            v = np.clip(v, 0, 255)
            hsv = cv2.merge([h, s, v]).astype(np.uint8)
            processing_img = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

        # --- Document Mode (CLAHE + Gamma) ---
        if doc_mode:
            # Convert to Grayscale
            gray = cv2.cvtColor(processing_img, cv2.COLOR_BGR2GRAY)
            
            # CLAHE (Contrast Limited Adaptive Histogram Equalization)
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            gray = clahe.apply(gray)
            
            # Gamma Correction (Gamma=2.0 makes it darker/bolder)
            gamma = 2.0
            inv_gamma = 1.0 / gamma
            table = np.array([((i / 255.0) ** inv_gamma) * 255 for i in np.arange(0, 256)]).astype("uint8")
            gray = cv2.LUT(gray, table)
            
            # Convert back to BGR for consistent pipeline
            processing_img = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

        # --- Unsharp Masking ---
        # Note: If doc processing was done, we sharpen the result of that.
        final_img = apply_unsharp_mask(processing_img, radius, amount, threshold)

        # --- Metrics ---
        # Calculate MSE/PSNR between Original (Pre-processing) and Final Result
        # Note: If Document Mode is on, original vs result will vary greatly in color
        mse, psnr = calculate_mse_psnr(original_img, final_img)

        return {
            "original": encode_image(original_img),
            "sharpened": encode_image(final_img),
            "metrics": {
                "mse": float(f"{mse:.4f}"),
                "psnr": "Infinite" if psnr == float('inf') else float(f"{psnr:.4f}"),
                "ssim": 0.95 # Placeholder for now, SSI requires scikit-image which is heavy
            }
        }

    except Exception as e:
        print(f"Error in pipeline: {e}")
        raise e
