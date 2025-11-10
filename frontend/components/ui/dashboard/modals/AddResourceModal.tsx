"use client";

import { ReactNode, SetStateAction, useEffect } from "react";
import { X } from "lucide-react";

interface AddResourceModal {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

export default function AddResourceModal({ isModalOpen, setIsModalOpen, children }: AddResourceModal) {
    return (
        <div className={`bg-background/0 backdrop-blur-xs fixed inset-0 z-[100] ${isModalOpen ? "block" : "hidden"}`}>
            <div className="fixed gap-xl flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background z-[101] w-full max-w-[650px] p-xl rounded-md border-border-strong border-1">
                <div className="flex flex-row justify-between">
                    <h2 className="body font-normal">
                        Add a resource
                    </h2>
                    <button 
                        className="hover:bg-surface-hover rounded-full cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <X size={28} />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
        
    )
}