"use client";

import { useState, useRef } from "react";
import { CloudUpload, X } from "lucide-react";

interface FileInputProps {
    label: string;
    name?: string;
};

export default function FileInput({ label, name="files"}: FileInputProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const updateHiddenInput = (files: File[]) => {
        if (!hiddenInputRef.current) return;
        
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        hiddenInputRef.current.files = dataTransfer.files;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const updatedFiles = [...selectedFiles, ...newFiles];
            setSelectedFiles(updatedFiles);
            updateHiddenInput(updatedFiles);
            event.target.value = "";
        }
    }

    const removeFile = (indexToRemove: number) => {
        const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(updatedFiles);
        updateHiddenInput(updatedFiles);
    }

    return (
        <>
        <div className="self-start flex flex-row items-center gap-xl">
            <div>
                <label
                    htmlFor="file-upload-visible"
                    className="body bg-white text-background p-sm rounded-md flex flex-row items-center gap-xs cursor-pointer hover:bg-gray-100 duration-150"
                >
                    <CloudUpload size={28} />
                    {label}
                </label>
                <input
                    id="file-upload-visible"
                    className="hidden" 
                    type="file"
                    onChange={handleChange}
                    multiple 
                />
                <input
                    ref={hiddenInputRef}
                    name={name}
                    type="file"
                    multiple
                    className="hidden"
                />
            </div>
        </div>
        <div>
                {selectedFiles.length === 0 ? (
                    <p className="text-gray-500">No resource(s) uploaded...</p>
                ) : (
                    <ul className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <li 
                                key={`${file.name}-${index}`}
                                className="flex items-center gap-xs bg-surface p-xs rounded"
                            >
                                <p className="flex-1 truncate">{file.name}</p>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-primary-600 hover:text-primary-700 cursor-pointer hover:bg-surface-hover rounded-full p-xs"
                                >
                                    <X size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
        
    )          
}