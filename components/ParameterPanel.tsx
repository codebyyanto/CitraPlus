'use client';

interface ParameterPanelProps {
    radius: number;
    amount: number;
    threshold: number;
    setRadius: (val: number) => void;
    setAmount: (val: number) => void;
    setThreshold: (val: number) => void;
}

export default function ParameterPanel({
    radius,
    amount,
    threshold,
    setRadius,
    setAmount,
    setThreshold,
}: ParameterPanelProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Pengaturan Parameter</h3>

            <div className="space-y-8">
                {/* Radius */}
                <div className="group">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Radius (Blur Sigma)</label>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 rounded">{radius.toFixed(1)}</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="10.0"
                        step="0.1"
                        value={radius}
                        onChange={(e) => setRadius(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Amount */}
                <div className="group">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Amount (Kekuatan)</label>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 rounded">{amount.toFixed(1)}</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="5.0"
                        step="0.1"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Threshold */}
                <div className="group">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Threshold (Ambang Batas)</label>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 rounded">{threshold.toFixed(1)}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={threshold}
                        onChange={(e) => setThreshold(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                <p><strong>Catatan:</strong> Radius yang lebih tinggi mempengaruhi fitur yang lebih besar. Amount meningkatkan kontras. Threshold membatasi amplifikasi noise.</p>
            </div>
        </div>
    );
}
