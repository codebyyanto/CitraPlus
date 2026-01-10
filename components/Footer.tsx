'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-extrabold tracking-tight">
                                <span className="text-blue-600">Citra</span>
                                <span className="text-slate-900">Plus</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-slate-500 leading-relaxed text-sm">
                            Solusi penajaman citra digital berbasis web yang cepat, mudah, dan profesional. Didesain untuk memaksimalkan kualitas foto Anda secara instan.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="font-bold text-slate-900 text-lg">Navigasi</h3>
                        <ul className="flex flex-col space-y-3">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Teori', href: '/teori' },
                                { name: 'Demo', href: '/demo' },
                                { name: 'Tentang', href: '/tentang' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-500 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 mt-12 pt-8 flex justify-center items-center">
                    <p className="text-slate-400 text-sm text-center">
                        &copy; {new Date().getFullYear()} CitraPlus. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
