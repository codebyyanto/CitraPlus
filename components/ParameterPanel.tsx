'use client';

interface ParameterPanelProps {
    radius: number;
    amount: number;
    threshold: number;
    isAI: boolean;
    mode: 'photo' | 'document';
    setRadius: (val: number) => void;
    setAmount: (val: number) => void;
    setThreshold: (val: number) => void;
    setIsAI: (val: boolean) => void;
    setMode: (val: 'photo' | 'document') => void;
}

export default function ParameterPanel({
    radius,
    amount,
    threshold,
    isAI = false,
    mode = 'photo',
    setRadius,
    setAmount,
    setThreshold,
    setIsAI,
    setMode,
}: ParameterPanelProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Pengaturan Parameter</h3>
                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                    <button
                        onClick={() => setMode('photo')}
                        className={`px-3 py-1.5 rounded-md transition-all ${mode === 'photo' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Photo
                    </button>
                    <button
                        onClick={() => {
                            setMode('document');
                            setIsAI(false);
                        }}
                        className={`px-3 py-1.5 rounded-md transition-all ${mode === 'document' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Document
                    </button>
                </div>
            </div>

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
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
                    />
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Menentukan lebar area tepi yang akan dipertajam.
                        <span className="block mt-1 text-amber-600 font-medium">💡 Tips: Gunakan radius 0.5 - 2.0 untuk detail halus.</span>
                    </p>
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
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
                    />
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Mengontrol seberapa kuat efek penajaman (kontras) diterapkan pada tepi.
                        <span className="block mt-1 text-amber-600 font-medium">💡 Tips: Mulai dari 1.0, naikkan jika kurang tajam. Hati-hati over-sharpening.</span>
                    </p>
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
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-2"
                    />
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Nilai minimum perbedaan kecerahan agar penajaman dilakukan. Mengurangi noise.
                        <span className="block mt-1 text-amber-600 font-medium">💡 Tips: Naikkan jika muncul bintik-bintik (noise) pada area rata.</span>
                    </p>
                </div>

                {/* AI Restoration Toggle (Only in Photo Mode) */}
                {mode === 'photo' && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                                <path d="M12 2a1 1 0 0 1 1 1v2.24a8.03 8.03 0 0 1 5.76 5.76H21a1 1 0 0 1 0 2h-2.24a8.03 8.03 0 0 1-5.76 5.76V21a1 1 0 0 1-2 0v-2.24a8.03 8.03 0 0 1-5.76-5.76H3a1 1 0 0 1 0-2h2.24A8.03 8.03 0 0 1 11 5.24V3a1 1 0 0 1 1-1zm0 4.24a5.98 5.98 0 0 0-3.9 10.66l.84-1.42A4.32 4.32 0 0 1 6.32 12c0-2.2 1.63-4.04 3.78-4.32l.9-3.44zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                            </svg>
                        </div>

                        <div className="flex items-center justify-between mb-2 relative z-10">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">✨</span>
                                <label className="font-bold text-slate-900">AI Restoration</label>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isAI}
                                    onChange={(e) => setIsAI(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <p className="text-xs text-slate-600 relative z-10 font-medium">
                            Algoritma cerdas untuk mengurangi noise dan meningkatkan warna secara otomatis sebelum penajaman.
                        </p>
                    </div>
                )}
            </div>


        </div >
    );
}
