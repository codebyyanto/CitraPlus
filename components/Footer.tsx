'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-extrabold tracking-tight">
                                <span className="text-blue-600">Citra</span>
                                <span className="text-slate-900">Plus</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-slate-500 leading-relaxed max-w-xs">
                            Platform edukasi dan demonstrasi untuk memahami algoritma penajaman citra digital Unsharp Masking.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Navigasi</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Beranda', href: '/' },
                                { name: 'Teori', href: '/teori' },
                                { name: 'Demo', href: '/demo' },
                                { name: 'Tentang', href: '/tentang' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-600 hover:text-blue-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Creds - REMOVED */}
                </div>

                <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} CitraPlus. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
