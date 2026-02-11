"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState, useMemo } from "react";

export default function Tabs({ id }: { id: string }) {
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    const [bgStyle, setBgStyle] = useState({ width: 115, left: 0 });

	const tabs = useMemo(
		() => [
			{ href: `/colors/${id}`, label: "Information" },
			{ href: `/colors/${id}/examples`, label: "Examples" },
			{ href: `/colors/${id}/export`, label: "Export" },
		],
		[id]
	);

    useEffect(() => {
        if (!ref.current) return;

        const links = Array.from(ref.current.querySelectorAll("a")) as HTMLElement[];
        const activeTab = links.find((link) => link.getAttribute("href") === pathname);

        if (activeTab) {
            setBgStyle({ width: activeTab.offsetWidth, left: activeTab.offsetLeft });
        }
    }, [pathname, tabs]);

    return (
        <nav className="relative flex bg-background rounded h-[40px]" ref={ref}>
            <div
                className="absolute top-0 h-[40px] bg-surface transition-all duration-100 rounded-t-lg"
                style={{ width: bgStyle.width, left: bgStyle.left }}
            />

            {tabs.map((tab) => {
				const isActive = pathname === tab.href;

				return (
					<Link
						key={tab.href}
						href={tab.href}
						prefetch
						className={
							`relative px-4 py-2 z-10 cursor-pointer hover:text-white transition-colors duration-100
							${isActive ? "text-white" : "text-text-secondary"}`
						}
					>
						{tab.label}
					</Link>
				)
			})}
        </nav>
    );
}