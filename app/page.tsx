import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Activity, Layers } from 'lucide-react';
import MotionWrapper from '@/components/MotionWrapper';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden flex flex-col pt-24 sm:pt-32">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">

        <MotionWrapper delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
            Penajaman Citra dengan <br />
            <span className="text-blue-600">Unsharp Masking</span>
          </h1>
        </MotionWrapper>

        <MotionWrapper delay={0.3}>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform interaktif untuk memahami dan mengevaluasi teknik peningkatan detail citra digital.
            Analisis dampak parameter Radius, Amount, dan Threshold secara real-time.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.5}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200"
            >
              Mulai Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/teori"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm"
            >
              Pelajari Teori
            </Link>
          </div>
        </MotionWrapper>

        {/* Example Result Images */}
        <MotionWrapper delay={0.8} type="fade">
          <div className="mt-20 border-t border-slate-200/60 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Before */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <img
                  src="https://placehold.co/600x400/e2e8f0/1e293b?text=Sebelum+(Original)"
                  alt="Citra Asli"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sebelum
                </div>
              </div>

              {/* After */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <img
                  src="https://placehold.co/600x400/e2e8f0/1e293b?text=Sesudah+(Sharpened)"
                  alt="Citra Hasil"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-blue-600/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sesudah
                </div>
              </div>
            </div>
            <p className="mt-8 text-slate-500 text-sm font-medium">Visualisasi perbandingan hasil penajaman citra digital</p>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}
