'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Beranda', href: '/' },
        { name: 'Teori', href: '/teori' },
        { name: 'Demo', href: '/demo' },
        { name: 'Tentang', href: '/tentang' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-6 flex-1">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                                {/* Simple Logo Icon Placeholder or similar if needed, keeping text for now relative to previous steps */}
                                <span className="text-2xl font-extrabold tracking-tight">
                                    <span className="text-white">Citra</span>
                                    <span className="text-blue-200">Plus</span>
                                </span>
                            </div>
                            <span className="hidden lg:block text-sm font-medium text-blue-100 border-l pl-3 border-blue-400/30 whitespace-nowrap">
                                Penajaman Citra dengan Unsharp Masking
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden sm:flex sm:items-center sm:space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                                        pathname === item.href
                                            ? 'bg-white/20 text-white shadow-sm ring-1 ring-white/30'
                                            : 'text-blue-50 hover:bg-white/10 hover:text-white'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center">
                            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-50 hover:shadow-lg active:scale-95 transition-all duration-200 shadow-md ring-2 ring-white/20">
                                Masuk
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
