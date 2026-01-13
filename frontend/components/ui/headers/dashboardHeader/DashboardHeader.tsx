"use client";

import { useRef, useLayoutEffect, useState, ReactNode } from "react";
import Search from "../../inputs/Search";
import BaseButton from "../../buttons/BaseButton";
import Link from "next/link";

interface DashboardHeaderProps {
    children: ReactNode;
}

export default function DashboardHeader({ children }: DashboardHeaderProps) {
    const [headerHeight, setHeaderHeight] = useState(87);
    const [isModalOpen, SetIsModalOpen] = useState(false); 
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateHeight = () => {
            setHeaderHeight(element.clientHeight);
        }
        updateHeight();

        document.addEventListener("resize", updateHeight);
        return () => document.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <>
            <header 
                ref={ref} 
                className={`
                    fixed w-full flex flex-row justify-between items-center section-x-padding border-b-1 border-border z-[101]
                    ${isModalOpen ? "bg-background" : "bg-background/25 backdrop-blur-xl"}
                `}
            >
                <div>
                    <h1 className="heading-4 py-md ">Dashboard</h1>
                </div>
                <div className="flex flex-row gap-xl">
                    <Search />
					<Link href="/admin/add-resource">
						<BaseButton label="Add resource" />
					</Link>
                </div>
            </header>

            <div style={{ height: headerHeight}}/>
        </> 
        
    )
}