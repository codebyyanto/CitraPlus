import requests
import io
import base64

def test_process():
    url = 'http://127.0.0.1:5000/process'
    
    # Create a dummy image (100x100 red image)
    # We need to install 'pillow' for this test script or use cv2
    try:
        import cv2
        import numpy as np
        img = np.zeros((100, 100, 3), dtype=np.uint8)
        img[:] = (0, 0, 255) # Red
        _, buffer = cv2.imencode('.png', img)
        file_bytes = buffer.tobytes()
    except ImportError:
        print("Please install opencv-python-headless first")
        return

    files = {'image': ('test.png', file_bytes, 'image/png')}
    data = {
        'radius': '2.0',
        'amount': '1.5',
        'threshold': '5',
        'ai': 'false',
        'mode': 'photo'
    }

    try:
        response = requests.post(url, files=files, data=data)
        if response.status_code == 200:
            json_data = response.json()
            print("✅ SUCCESS!")
            print(f"MSE: {json_data['metrics']['mse']}")
            print(f"PSNR: {json_data['metrics']['psnr']}")
            print("Original Image (Base64 length):", len(json_data['original']))
            print("Sharpened Image (Base64 length):", len(json_data['sharpened']))
        else:
            print("❌ FAILED with status code:", response.status_code)
            print("Response:", response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ FAILED to connect. Is the Flask server running on port 5000?")

if __name__ == '__main__':
    test_process()
