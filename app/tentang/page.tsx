export default function TentangPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Tentang CitraPlus</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-lg text-slate-700 mb-6">
                    CitraPlus dikembangkan sebagai media pembelajaran dan demonstrasi praktis mata kuliah
                    <strong> Pengolahan Citra Digital (PCD)</strong>. Proyek ini bertujuan untuk memvisualisasikan
                    bagaimana algoritma penajaman bekerja secara real-time.
                </p>

                <h2 className="text-xl font-bold text-slate-900 mb-3">Teknologi yang Digunakan</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { name: 'Next.js 15', desc: 'App Router framework' },
                        { name: 'Tailwind CSS', desc: 'Styling & Design System' },
                        { name: 'Sharp', desc: 'High performance image processing' },
                        { name: 'Lucide React', desc: 'Iconography' },
                        { name: 'TypeScript', desc: 'Type safety' }
                    ].map((tech) => (
                        <li key={tech.name} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                            <div>
                                <span className="block font-medium text-slate-900">{tech.name}</span>
                                <span className="text-sm text-slate-500">{tech.desc}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-slate-100 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} CitraPlus Project. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
