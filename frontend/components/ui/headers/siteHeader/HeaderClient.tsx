"use client";

import Link from "next/link";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";

type Category = {
    name: string;
}

interface HeaderClientProps {
    categories: Category[];
}

export default function HeaderClient({ categories }: HeaderClientProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(64);
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();

    console.log(pathname)

    useEffect(() => {
        let ticking = false;

        const updateScrollY = () => {
            setScrollY(window.scrollY);
            ticking = false;
        };

          const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollY);
                ticking = true;
            }
        };

        updateScrollY();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", updateScrollY);
    }, []);
 
    useLayoutEffect(() => {
        const updateHeight = () => {
            if (ref.current) setHeaderHeight(ref.current.clientHeight);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <>
            <header ref={ref} className="fixed top-0 left-0 w-full z-50 section-x-padding">
                <div className={`
                    container flex items-center justify-between py-md transition-all duration-150 rounded-xl border-1 border-[var(--color-border)]
                    ${scrollY > 1 ? "px-xl mt-sm bg-surface/50 backdrop-blur-sm" : "bg-background border-transparent"}
                `}>
                    <div>
                        <h1 className="heading-4">
                            Stashbox
                        </h1>
                    </div>
                    <div className="hidden md:flex flex-row gap-xs sm:gap-md body-small">
                        {categories.map((category) => {
                            const link = category.name;

                            return (
                                <Link 
                                    key={link} 
                                    href={`/${link.toLowerCase()}`}
                                    className={`
                                        transition-colors duration-150
                                        ${pathname === `/${link.toLowerCase()}` 
                                        ? "text-[var(--color-text-primary)]" 
                                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}
                                    `}
                                >
                                    {link}
                                </Link>
                            )
                        })}
                    </div>
					<div className="md:hidden">
						<p>MENU</p>
					</div>
                </div>
            </header>
            
            <div className="bg-transparent" style={{height: headerHeight}} /> 
        </>
    )
}