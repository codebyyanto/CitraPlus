'use client';

import Link from 'next/link';
import MotionWrapper from '@/components/MotionWrapper';
import { Target, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeoriPage() {
    // Icon animation variants
    const iconVariants = {
        hidden: { scale: 0, opacity: 0, rotate: -45 },
        visible: (custom: number) => ({
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                delay: custom * 0.2 + 0.8,
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }),
        hover: {
            scale: 1.2,
            rotate: 15,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <MotionWrapper delay={0.1}>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Teori <span className="text-blue-600">Unsharp Masking</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Memahami konsep dasar dan matematis di balik algoritma penajaman citra digital yang paling populer.
                    </p>
                </div>
            </MotionWrapper>

            <div className="space-y-16">
                {/* Definisi */}
                <MotionWrapper delay={0.3} type="slideUp">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                                    Apa itu Unsharp Masking?
                                </h2>
                                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                    <strong className="text-slate-900">Unsharp Masking (USM)</strong> adalah teknik pemrosesan citra digital yang, berlawanan dengan namanya, digunakan untuk
                                    <span className="italic text-blue-700 font-medium"> mempertajam</span> tepi pada gambar.
                                    Teknik ini bekerja dengan mengurangi versi "blur" (tidak tajam) dari gambar asli untuk mendeteksi tepi, lalu menambahkan deteksi tepi tersebut kembali ke gambar asli.
                                </p>
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                    <p className="text-sm text-blue-800 italic">
                                        Note: Nama "unsharp" berasal dari teknik fotografi analog ruang gelap tradisional menggunakan film negatif buram untuk membuat masker.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-3 text-center">Analogi Visual</h3>
                                <div className="space-y-2">
                                    <div className="h-2 bg-slate-300 rounded overflow-hidden">
                                        <div className="h-full w-full bg-slate-400"></div>
                                    </div>
                                    <div className="flex justify-center text-xs text-slate-400">Original</div>

                                    <div className="h-2 bg-slate-300 rounded overflow-hidden blur-[2px]">
                                        <div className="h-full w-full bg-slate-400"></div>
                                    </div>
                                    <div className="flex justify-center text-xs text-slate-400">Blur (Mask)</div>

                                    <div className="h-2 bg-slate-300 rounded overflow-hidden relative">
                                        <div className="absolute inset-x-0 top-0 bottom-0 border-x-2 border-blue-500"></div>
                                    </div>
                                    <div className="flex justify-center text-xs text-blue-600 font-medium">Hasil Tajam</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>

                {/* Prinsip Kerja & Rumus */}
                <MotionWrapper delay={0.5} type="slideUp">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-[#0B1120] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                            {/* Decorative Gradients */}
                            <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 p-24 bg-purple-500/10 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>

                            <div className="relative z-10">
                                <h2 className="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-lg">ƒ</span>
                                    Rumus Matematis
                                </h2>

                                <div className="space-y-8 font-mono">
                                    {/* Main Formula Card */}
                                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-inner group transition-all hover:border-blue-500/30">
                                        <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">Formula Utama</p>
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-relaxed">
                                            g(x,y) <span className="text-slate-500 mx-1">=</span> f(x,y) <span className="text-blue-400 mx-1">+</span> k <span className="text-blue-400 mx-1">×</span> g_mask(x,y)
                                        </div>
                                    </div>

                                    {/* Variable Definitions Grid */}
                                    <div className="grid grid-cols-[min-content_auto] gap-x-4 gap-y-4 text-sm sm:text-base text-slate-300 items-baseline">
                                        <span className="text-blue-400 font-bold whitespace-nowrap">g_mask</span>
                                        <span>= f(x,y) - f_smooth(x,y)</span>

                                        <span className="text-blue-400 font-bold whitespace-nowrap">f(x,y)</span>
                                        <span>= Citra Asli (Input)</span>

                                        <span className="text-blue-400 font-bold whitespace-nowrap">f_smooth</span>
                                        <span>= Citra Blur (Gaussian Filter)</span>

                                        <span className="text-blue-400 font-bold whitespace-nowrap">k</span>
                                        <span>= Faktor Penguat (Amount)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Logika Algoritma</h2>
                            <ol className="relative border-l border-slate-200 ml-3 space-y-8">
                                <li className="pl-8 relative">
                                    <span className="absolute -left-3 top-1 w-6 h-6 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">1</span>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-1">Blurring</h4>
                                    <p className="text-slate-600">Buat salinan buram dari citra asli menggunakan low-pass filter (Gaussian Blur).</p>
                                </li>
                                <li className="pl-8 relative">
                                    <span className="absolute -left-3 top-1 w-6 h-6 bg-indigo-100 border-2 border-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-indigo-700">2</span>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-1">Subtraction (Masking)</h4>
                                    <p className="text-slate-600">Kurangi citra asli dengan citra blur untuk mendapatkan "mask" yang berisi detail frekuensi tinggi (tepi).</p>
                                </li>
                                <li className="pl-8 relative">
                                    <span className="absolute -left-3 top-1 w-6 h-6 bg-purple-100 border-2 border-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">3</span>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-1">Addition</h4>
                                    <p className="text-slate-600">Tambahkan mask kembali ke citra asli dengan faktor penguat tertentu untuk mempertajam detail.</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </MotionWrapper>

                {/* Parameters */}
                <MotionWrapper delay={0.7} type="slideUp">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Parameter Utama</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Radius",
                                    Icon: Target,
                                    color: "text-red-500",
                                    bg: "bg-red-50",
                                    desc: "Menentukan seberapa tebal garis tepi yang akan dipertajam. Nilai kecil untuk detail halus, nilai besar untuk kontras yang lebih luas.",
                                    detail: "Mengatur ketebalan efek."
                                },
                                {
                                    title: "Amount",
                                    Icon: Zap,
                                    color: "text-amber-500",
                                    bg: "bg-amber-50",
                                    desc: "Mengatur seberapa kuat efek penajaman terlihat. Semakin tinggi nilainya, gambar akan semakin tajam dan kontras.",
                                    detail: "Mengatur kekuatan efek."
                                },
                                {
                                    title: "Threshold",
                                    Icon: Shield,
                                    color: "text-emerald-500",
                                    bg: "bg-emerald-50",
                                    desc: "Fitur pintar yang mencegah noise (bintik-bintik) ikut dipertajam. Hanya mempertajam bagian yang benar-benar tepi objek.",
                                    detail: "Mencegah noise berlebih."
                                }
                            ].map((param, idx) => (
                                <motion.div
                                    key={idx}
                                    className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                                    whileHover={{ y: -5 }}
                                >
                                    <motion.div
                                        className={`w-14 h-14 ${param.bg} ${param.color} rounded-2xl flex items-center justify-center mb-6`}
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        custom={idx}
                                    >
                                        <param.Icon size={28} strokeWidth={2.5} />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{param.title}</h3>
                                    <p className="text-slate-600 mb-4 h-20 text-sm">{param.desc}</p>
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{param.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        </div>
    );
}
