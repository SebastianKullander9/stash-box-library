"use client";

import { useState } from "react";
import { menuItems } from "./mockData";
import HamburgerIcon from "./HamburgerIcon";
import MobileBackdrop from "./MobileBackdrop";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            <MobileBackdrop menuItems={menuItems} isOpen={isOpen} />
        </>
        
    )
}