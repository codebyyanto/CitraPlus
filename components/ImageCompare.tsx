'use client';

/* eslint-disable @next/next/no-img-element */

interface ImageCompareProps {
    originalSrc: string | null;
    processedSrc: string | null;
}

export default function ImageCompare({ originalSrc, processedSrc }: ImageCompareProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 gap-8">
                {/* Original */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Citra Asli</h3>
                    <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        {originalSrc ? (
                            <img
                                src={originalSrc}
                                alt="Original"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                Belum ada citra
                            </div>
                        )}
                    </div>
                </div>

                {/* Sharpened */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Citra Hasil</h3>
                    <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        {processedSrc ? (
                            <img
                                src={processedSrc}
                                alt="Sharpened"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                Menunggu proses...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
