"use client";

import { useRef, useEffect } from "react";
import { ResourceTag } from "@/types";
import Image from "next/image";
import x from "../../../public/svgs/x.svg";

type FilterSidebarProps = {
    state: boolean;
    toggle: () => void;
    tags: ResourceTag[];
}

export default function FilterSidebar({ state, toggle, tags }: FilterSidebarProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                toggle();
            }
        }

        if (state) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [state, toggle]);

    return (
        <div ref={ref} className={`absolute top-0 left-0 ${state ? "translate-x-0" : "-translate-x-full"} main-x-padding main-y-padding bg-[var(--color-white)] h-screen w-[75vw] transition-transform duration-300`}>
            <div className="relative flex items-center justify-between mb-4">
                <h1 className="text-lg text-normal mb-0">Filter by tags</h1>
                <div onClick={toggle} className="absolute right-0 p-2 block hover:bg-gray-300 cursor-pointer rounded-full transition-colors duration-200">
                    <Image src={x} alt="close filter sidebar" width={27} height={27} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {tags.map((tag, index) => (
                    <button 
                        key={index} 
                        className="col-span-1 w-full bg-gray-300 text-black text-normal p-normal py-2 rounded-sm mb-0 cursor-pointer hover:bg-gray-400 transition-color duration-200"
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
        </div>
    )
}