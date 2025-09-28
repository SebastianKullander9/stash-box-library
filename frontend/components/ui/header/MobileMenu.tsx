"use client";

import { useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import MobileBackdrop from "./MobileBackdrop";

type menuItem = {
    title: string;
    link: string;
}

interface DesktopMenuProps {
    menuItems: menuItem[];
}

export default function MobileMenu({ menuItems }: DesktopMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            <MobileBackdrop menuItems={menuItems} isOpen={isOpen} />
        </>
        
    )
}