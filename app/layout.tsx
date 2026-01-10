import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CitraPlus - Image Sharpening Implementation',
  description: 'Implementasi dan Evaluasi Metode Unsharp Masking pada Penajaman Citra Digital',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
