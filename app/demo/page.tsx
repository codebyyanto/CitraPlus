'use client';

import { useState } from 'react';
import UploadBox from '@/components/UploadBox';
import ParameterPanel from '@/components/ParameterPanel';
import ImageCompare from '@/components/ImageCompare';
import ResultInfo from '@/components/ResultInfo';
import MotionWrapper from '@/components/MotionWrapper';

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
            if (data.original) {
                setOriginalPreview(data.original);
            }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <MotionWrapper delay={0.1}>
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
                        Demo <span className="text-blue-600">Penajaman Citra</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Unggah foto Anda, atur parameter, dan saksikan bagaimana algoritma <span className="font-semibold text-slate-900">Unsharp Masking</span> meningkatkan detail dan ketajaman gambar secara instan.
                    </p>
                </div>
            </MotionWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
                {/* Left Column: Controls (Upload & Params) */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 h-fit">
                    <MotionWrapper delay={0.2} type="slideUp">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">1</span>
                                Upload Gambar
                            </h3>
                            <UploadBox onImageSelected={handleImageSelected} />
                        </div>
                    </MotionWrapper>

                    <MotionWrapper delay={0.3} type="slideUp">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">2</span>
                                Atur Parameter
                            </h3>

                            <div className="relative z-10">
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
                    </MotionWrapper>

                    <MotionWrapper delay={0.4} type="slideUp">
                        <button
                            onClick={handleProcess}
                            disabled={!file || isProcessing}
                            className={`
                                w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-300
                                ${!file || isProcessing
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]'
                                }
                            `}
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </span>
                            ) : (
                                'Proses Citra Sekarang'
                            )}
                        </button>
                    </MotionWrapper>
                </div>

                {/* Right Column: Preview & Results */}
                <div className="lg:col-span-7 space-y-8">
                    {!file ? (
                        <MotionWrapper delay={0.3} type="scale">
                            <div className="border-2 border-dashed border-slate-200 rounded-3xl h-[600px] flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                                <div className="p-4 bg-white rounded-full mb-4 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="font-medium">Preview gambar akan muncul di sini</p>
                                <p className="text-sm">Silakan pilih gambar terlebih dahulu</p>
                            </div>
                        </MotionWrapper>
                    ) : (
                        <div className="space-y-8">
                            <MotionWrapper delay={0.1} type="scale">
                                <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
                                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                                        <h3 className="text-white font-medium flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Live Preview
                                        </h3>
                                        {!processedPreview && <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Original Image</span>}
                                        {processedPreview && <span className="text-blue-400 text-xs uppercase tracking-wider font-bold">Comparison Mode</span>}
                                    </div>
                                    <div className="relative">
                                        <ImageCompare originalSrc={originalPreview} processedSrc={processedPreview} />
                                    </div>
                                </div>
                            </MotionWrapper>

                            {processedPreview && (
                                <MotionWrapper delay={0.2} type="slideUp">
                                    <div className="bg-white rounded-3xl p-1 shadow-sm border border-slate-100">
                                        <ResultInfo metrics={metrics} onDownload={handleDownload} processedSrc={processedPreview} />
                                    </div>
                                </MotionWrapper>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
