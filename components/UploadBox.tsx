'use client';

import { Upload, FileImage } from 'lucide-react';
import { useCallback, useState } from 'react';
import { clsx } from 'clsx';

interface UploadBoxProps {
    onImageSelected: (file: File) => void;
}

export default function UploadBox({ onImageSelected }: UploadBoxProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                setFileName(file.name);
                onImageSelected(file);
            }
        },
        [onImageSelected]
    );

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setFileName(file.name);
                onImageSelected(file);
            }
        },
        [onImageSelected]
    );

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Unggah Citra</h3>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={clsx(
                    'relative border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer group',
                    isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                )}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center text-slate-500 group-hover:text-blue-600">
                    <Upload className="w-10 h-10 mb-3" />
                    <p className="text-sm font-medium">Tarik & Lepas atau <span className="underline decoration-2 underline-offset-2">Pilih File</span></p>
                </div>
            </div>
            {fileName && (
                <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <FileImage className="text-blue-500 w-5 h-5" />
                    <span className="text-sm text-slate-700 truncate flex-1">{fileName}</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">Terunggah</span>
                </div>
            )}
        </div>
    );
}
