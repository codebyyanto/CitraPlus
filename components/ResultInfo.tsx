'use client';

import { Download, Activity, TrendingUp, BarChart3 } from 'lucide-react';

interface ResultInfoProps {
    metrics: {
        mse: number;
        psnr: number | string;
        ssim?: number;
    } | null;
    onDownload: () => void;
    processedSrc: string | null;
}

export default function ResultInfo({ metrics, onDownload, processedSrc }: ResultInfoProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Hasil Evaluasi</h3>
                {processedSrc && (
                    <button
                        onClick={onDownload}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Unduh Hasil
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* PSNR */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-slate-600">PSNR (dB)</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                        {metrics ? metrics.psnr : '-'}
                    </div>
                </div>

                {/* MSE */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm font-medium text-slate-600">MSE</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                        {metrics ? metrics.mse : '-'}
                    </div>
                </div>

                {/* Time / Placeholder */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-slate-600">SSIM (Est)</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                        {metrics?.ssim ? metrics.ssim : '-'}
                    </div>
                </div>
            </div>
        </div>
    );
}
