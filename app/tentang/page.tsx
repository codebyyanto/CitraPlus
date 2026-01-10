import MotionWrapper from '@/components/MotionWrapper';
import Link from 'next/link';
import { Target, Zap, CheckCircle, Cpu, FileJson, Palette, Activity } from 'lucide-react';

export default function TentangPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-slate-900 pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <MotionWrapper delay={0.1}>
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-6 tracking-tight">
                            Tentang <span className="text-blue-500">CitraPlus</span>
                        </h1>
                    </MotionWrapper>
                    <MotionWrapper delay={0.2}>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Platform interaktif modern untuk memahami dan mendemonstrasikan algoritma
                            pengolahan citra digital dengan fokus pada <span className="text-white font-semibold">Unsharp Masking</span>.
                        </p>
                    </MotionWrapper>
                </div>
            </div>

            {/* Main Content Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Mission / Purpose */}
                    <MotionWrapper delay={0.3} type="slideUp">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-full">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <Target size={28} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tujuan Kami</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                CitraPlus dirancang untuk menjembatani kesenjangan antara teori akademis dan implementasi praktis.
                                Dalam mata kuliah <strong>Pengolahan Citra Digital</strong>, pemahaman visual sangat krusial.
                                Aplikasi ini memungkinkan mahasiswa dan praktisi untuk:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Bereksperimen dengan parameter algoritma secara real-time.',
                                    'Melihat dampak perubahan radius, amount, dan threshold.',
                                    'Membandingkan citra asli dan hasil secara berdampingan (side-by-side).',
                                    'Menganalisis hasil menggunakan metrik objektif (PSNR, MSE).'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </MotionWrapper>

                    {/* Features / Highlights */}
                    <div className="space-y-8">
                        <MotionWrapper delay={0.4} type="slideUp">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                                    <Zap size={28} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Teknologi Modern</h2>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Dibangun dengan stack teknologi terkini untuk memastikan performa tinggi dan pengalaman pengguna (UX) yang mulus.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Next.js */}
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                                            <span className="text-slate-900">
                                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                    <path d="M2.667 12a9.333 9.333 0 1 1 18.667 0 9.333 9.333 0 0 1-18.667 0zm9.333-10.667C6.066 1.333 1.333 6.066 1.333 12s4.733 10.667 10.667 10.667S22.667 17.934 22.667 12 17.934 1.333 12 1.333zm4.24 13.786L10.973 8H9.333v8h1.334V9.68l4.906 6.12c.427.173.88.267 1.334.267.4 0 .787-.08 1.16-.214l-1.827-2.28z" />
                                                </svg>
                                            </span>
                                            Next.js 15
                                        </div>
                                        <div className="text-xs text-slate-500">Framework React Tercepat</div>
                                    </div>

                                    {/* Sharp (Generic Image Icon but better) */}
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                                            <span className="text-blue-600">
                                                {/* Aperture Icon from Lucide via SVG/Path manually or reuse generic if needed, 
                                                   but let's use a nice Aperture or Layers icon to represent Image Processing */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" /><line x1="14.31" y1="8" x2="20.05" y2="17.94" /><line x1="9.69" y1="8" x2="21.17" y2="8" /><line x1="7.38" y1="12" x2="13.12" y2="2.06" /><line x1="9.69" y1="16" x2="3.95" y2="6.06" /><line x1="14.31" y1="16" x2="2.83" y2="16" /><line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                                                </svg>
                                            </span>
                                            Sharp
                                        </div>
                                        <div className="text-xs text-slate-500">Pemrosesan Citra High-Speed</div>
                                    </div>

                                    {/* Tailwind CSS */}
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                                            <span className="text-sky-500">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                                                </svg>
                                            </span>
                                            Tailwind CSS
                                        </div>
                                        <div className="text-xs text-slate-500">Sistem Desain Utilitas</div>
                                    </div>

                                    {/* Framer Motion */}
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                                            <span className="text-purple-600">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                                    <path d="M4 0h16v8h-8zM4 12h8v8zM12 24v-8h8z" />
                                                </svg>
                                            </span>
                                            Framer Motion
                                        </div>
                                        <div className="text-xs text-slate-500">Animasi Interaktif</div>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </div>

                {/* Developer / Credits Section (Optional but nice) */}
                <MotionWrapper delay={0.5} type="slideUp">
                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white text-center shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Siap untuk Mencoba?</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Jangan hanya membaca teorinya. Upload gambar Anda sekarang dan rasakan perubahannya secara langsung.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/demo" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Coba Demo Sekarang
                            </Link>
                            <Link href="/teori" className="px-8 py-4 bg-blue-700 text-white border border-blue-500 rounded-xl font-bold hover:bg-blue-600 transition-all">
                                Pelajari Teori
                            </Link>
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        </div>
    );
}
