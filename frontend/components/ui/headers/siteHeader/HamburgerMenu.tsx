"use client";

import { Cross as Hamburger} from "hamburger-react";
import { useState } from "react";
import Link from "next/link";
import { ResourceCategory } from "@/types";

type HamburgerMenuProps = {
    categories: ResourceCategory[];
}

export default function HamburgerMenu({ categories }: HamburgerMenuProps) {
    const [isOpen, setOpen] = useState(false);
    
    return (
        <>  
            <div className="relative z-40">
                <Hamburger toggled={isOpen} toggle={setOpen} size={24} color={isOpen ? "#0e0e0e" : "#eaeaea"} />
            </div>

            <div className={`absolute right-0 top-0 h-screen w-screen bg-white text-black transition-transform duration-300 z-10 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <ul className="h-full main-x-padding flex flex-col justify-center">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link href="">{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}