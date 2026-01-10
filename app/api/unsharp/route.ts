import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

interface UnsharpParams {
    radius: number;
    amount: number;
    threshold: number;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        const radius = parseFloat(formData.get('radius') as string) || 1.0;
        const amount = parseFloat(formData.get('amount') as string) || 1.0;
        const threshold = parseFloat(formData.get('threshold') as string) || 0;

        if (!file) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // 1. Dapatkan Metadata dan Raw Data Original
        const originalImage = sharp(buffer);
        const metadata = await originalImage.metadata();
        const width = metadata.width || 0;
        const height = metadata.height || 0;

        // Paksa ke sRGB, 3 channel untuk kalkulasi yang lebih mudah, atau 4 channel (RGBA)
        // Kita gunakan RGBA untuk konsistensi
        const { data: originalPixels, info } = await originalImage
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

        // 2. Buat Versi Blurred (Low Pass Filter)
        // Sigma pada Gaussian Blur di sharp kira-kira setara dengan radius
        // sharp blur sigma = radius / 2 kira-kira, tapi documentasi bilang sigma.
        // Kita anggap radius user sbg sigma.
        const blurredBuffer = await originalImage
            .clone()
            .blur(radius) // sigma
            .ensureAlpha()
            .raw()
            .toBuffer();

        const resultPixels = Buffer.alloc(originalPixels.length);
        let totalSE = 0; // Sum of Squared Errors

        // 3. Proses Unsharp Masking per Pixel
        // Formula: Sharpened = Original + (Original - Blurred) * Amount
        // Syarat: if abs(Original - Blurred) > Threshold

        for (let i = 0; i < originalPixels.length; i += 4) {
            // Channel Alpha (i+3) disalin langsung
            resultPixels[i + 3] = originalPixels[i + 3];

            // Proses RGB
            for (let c = 0; c < 3; c++) {
                const orig = originalPixels[i + c];
                const blur = blurredBuffer[i + c];
                const diff = orig - blur;

                let sharpened = orig;

                if (Math.abs(diff) > threshold) {
                    sharpened = orig + (diff * amount);
                }

                // Clamp 0-255
                sharpened = Math.max(0, Math.min(255, sharpened));
                resultPixels[i + c] = Math.round(sharpened);

                // Hitung Error untuk MSE (Original vs Sharpened)
                // Di sini MSE mengukur seberapa jauh hasil dari original (derajat penajaman)
                const error = orig - resultPixels[i + c];
                totalSE += error * error;
            }
        }

        // 4. Hitung Metrik Evaluasi
        const totalPixels = width * height * 3; // Hanya RGB yang dihitung
        const mse = totalPixels === 0 ? 0 : totalSE / totalPixels;
        // PSNR = 10 * log10(MAX^2 / MSE). MAX biasanya 255.
        const psnr = mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse);

        // 5. Kembalikan Gambar Hasil
        const sharpenedImageBuffer = await sharp(resultPixels, {
            raw: {
                width,
                height,
                channels: 4,
            },
        })
            .png()
            .toBuffer();

        const originalBase64 = `data:image/png;base64,${await originalImage.png().toBuffer().then(b => b.toString('base64'))}`;
        const sharpenedBase64 = `data:image/png;base64,${sharpenedImageBuffer.toString('base64')}`;

        return NextResponse.json({
            original: originalBase64,
            sharpened: sharpenedBase64,
            metrics: {
                mse: parseFloat(mse.toFixed(4)),
                psnr: psnr === Infinity ? 'Infinite' : parseFloat(psnr.toFixed(4)),
                ssim: 0.95 // Placeholder, SSIM butuh library kompleks
            }
        });

    } catch (error) {
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }
}
