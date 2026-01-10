'use client';

import { useState } from 'react';
import UploadBox from '@/components/UploadBox';
import ParameterPanel from '@/components/ParameterPanel';
import ImageCompare from '@/components/ImageCompare';
import ResultInfo from '@/components/ResultInfo';

export default function DemoPage() {
    const [file, setFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string | null>(null);
    const [processedPreview, setProcessedPreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Parameters
    const [radius, setRadius] = useState(2.0);
    const [amount, setAmount] = useState(1.5);
    const [threshold, setThreshold] = useState(0);

    // Metrics
    const [metrics, setMetrics] = useState<{ mse: number; psnr: number | string; ssim?: number } | null>(null);

    const handleImageSelected = (selectedFile: File) => {
        setFile(selectedFile);
        // Create local preview
        const objectUrl = URL.createObjectURL(selectedFile);
        setOriginalPreview(objectUrl);
        setProcessedPreview(null);
        setMetrics(null);
    };

    const handleProcess = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('radius', radius.toString());
            formData.append('amount', amount.toString());
            formData.append('threshold', threshold.toString());

            const res = await fetch('/api/unsharp', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to process image');
            }

            const data = await res.json();
            // API returns base64 images
            // original: data.original (optional to use if we want server version, but local is faster for original)
            // sharpened: data.sharpened
            setProcessedPreview(data.sharpened);
            setMetrics(data.metrics);
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan saat memproses gambar.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (processedPreview) {
            const link = document.createElement('a');
            link.href = processedPreview;
            link.download = 'sharpened-result.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Demo Penajaman Citra</h1>
                <p className="mt-2 text-slate-600">
                    Unggah citra Anda dan proses penajaman menggunakan metode <span className="font-semibold text-blue-600">Unsharp Masking</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Upload */}
                <div className="space-y-6">
                    <UploadBox onImageSelected={handleImageSelected} />
                    {file && (
                        <div className="flex justify-end">
                            <button
                                onClick={handleProcess}
                                disabled={isProcessing}
                                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isProcessing ? 'Memproses...' : 'Proses Citra'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Parameters */}
                <div className="h-full">
                    <ParameterPanel
                        radius={radius}
                        amount={amount}
                        threshold={threshold}
                        setRadius={setRadius}
                        setAmount={setAmount}
                        setThreshold={setThreshold}
                    />
                </div>
            </div>

            {/* Comparison Section */}
            <ImageCompare originalSrc={originalPreview} processedSrc={processedPreview} />

            {/* Results Section */}
            <ResultInfo metrics={metrics} onDownload={handleDownload} processedSrc={processedPreview} />
        </div>
    );
}
