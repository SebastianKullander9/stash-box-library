"use client";

import { Ellipsis } from "lucide-react";
import { deleteResource } from "@/actions/resource";
import { useState, useRef, useEffect } from "react";

interface ActionsButtonProps {
   id: string;
}

export default function ActionsButton({ id }: ActionsButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="absolute top-1/2 -translate-y-1/2 right-0 p-md"
        >
            <div 
                ref={ref}
                className="hover:bg-surface-hover p-xs cursor-pointer rounded-md relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Ellipsis />
                <div
                    className={`
                        bg-background border-border-strong border-1 text-white absolute right-1/2 bottom-1/2 -transform-x-1/2 -transform-y-1/2 min-w-30
                        ${isOpen ? "block" : "hidden"}
                    `}
                    >
                    <p className="hover:bg-surface p-sm flex justify-center">View</p>
                    <p className="hover:bg-surface p-sm flex justify-center">Edit</p>
                    <form 
                        action={async (formData) => {
                            if (confirm("Are you sure you want to delete this resource?")) {
                                await deleteResource(formData);
                            }
                        }}
                    >
                        <input type="hidden" name="id" value={id} />
                        <button className="hover:bg-surface hover:text-red-500 p-sm cursor-pointer w-full">Delete</button>
                    </form>
                </div>
            </div> 
        </div>
    );
}