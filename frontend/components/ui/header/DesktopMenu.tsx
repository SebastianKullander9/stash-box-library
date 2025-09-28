"use client";

import { useState } from "react";

type menuItem = {
    title: string;
    link: string;
}

interface DesktopMenuProps {
    menuItems: menuItem[];
}

export default function DesktopMenu({ menuItems }: DesktopMenuProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <ul className="h-full flex gap-4">
            {menuItems.map((item, index) => (
                <li 
                    key={index} 
                    className={`h-full flex items-center cursor-pointer transition-colors duration-300 ${
                        hoveredIndex === index
                        ? "text-white"
                        : hoveredIndex !== null
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {item.title}
                </li>
            ))}
        </ul>
    );
}