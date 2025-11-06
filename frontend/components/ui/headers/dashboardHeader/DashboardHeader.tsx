"use client";

import { useRef, useLayoutEffect, useState, ReactNode } from "react";
import AddResourceButton from "../../buttons/AddResourceButton";
import Search from "../../inputs/Search";
import AddResourceModal from "../../dashboard/modals/AddResourceModal";

interface DashboardHeaderProps {
    children: ReactNode;
}

export default function DashboardHeader({ children }: DashboardHeaderProps) {
    const [headerHeight, setHeaderHeight] = useState(64);
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
                    <AddResourceButton 
                        isModalOpen={isModalOpen}
                        setIsModalOpen={SetIsModalOpen}
                    />
                </div>
            </header>

            <div style={{ height: headerHeight}}/>

            <AddResourceModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={SetIsModalOpen}
            >
                {children}
            </AddResourceModal>
        </> 
        
    )
}