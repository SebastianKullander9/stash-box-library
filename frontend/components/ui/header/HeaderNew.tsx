"use client";

import { useRef, useEffect } from "react";
import { ResourceCategory } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, File } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons/iconMap";

interface HeaderNewProps {
    categories: ResourceCategory[];
}

export default function HeaderNew({ categories }: HeaderNewProps) {
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!headerRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            document.documentElement.style.setProperty(
                "--header-height",
                `${entry.contentRect.height}px`,
            );
        });

        observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <header
            ref={headerRef}
            className="
			w-full flex flex-row justify-between
			bg-surface shadow-xs shadow-border rounded-full items-center p-xs border border-border
		"
        >
            <div className="pl-md">
                <Link href="/" className="heading-1">
                    STASHBOX
                </Link>
            </div>
            <nav className="flex gap-md">
                {categories.map((category) => {
                    const link = category.name.toLowerCase();
                    const Icon = CATEGORY_ICONS[link] ?? File;

                    return (
                        <Link
                            key={category.id}
                            href={`/${link}`}
                            className={`
									p-1 pr-md bg-surface-active border border-border-strong rounded-full flex flex-row items-center gap-xs 
									
									${pathname === `/${link}` ? "bg-white text-surface" : "hover:bg-surface-hover active:bg-surface-active group"}
								`}
                        >
                            <div
                                className={`
								p-xs bg-surface rounded-full
								${pathname === `/${link}` ? "text-white" : ""}
							`}
                            >
                                <Icon size={20} />
                            </div>
                            <p className={``}>{category.name}</p>
                        </Link>
                    );
                })}
            </nav>
            <Link href="/admin" className="flex flex-row">
                <div className="bg-surface-active py-sm px-md rounded-full flex flex-row items-center border border-border-strong">
                    Admin
                    <ArrowUpRight size={24} />
                </div>
            </Link>
        </header>
    );
}
