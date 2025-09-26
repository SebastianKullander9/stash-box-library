"use client";

import { useRef } from "react";
import gsap from "gsap";
import BaseButton from "./BaseButton";

export default function AnimatedButton({ label }: { label: string }) {
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const handleMouseLeave = () => {
        if (bgRef.current) {
            gsap.to(bgRef.current, { y: "-100%", duration: 0.3, ease: "power1.in" });
        }
        if (textRef.current) {
            gsap.to(textRef.current, { color: "black", duration: 0.1 });
        }
    };

    const handleMouseEnter = () => {
        if (bgRef.current) {
            gsap.fromTo(
                bgRef.current,
                { y: "100%" },
                { y: "0%", duration: 0.3, ease: "power1.out" }
            );
        }
        if (textRef.current) {
            gsap.to(textRef.current, { color: "white", duration: 0.1 });
        }
    };

    return (
        <BaseButton 
            handleMouseLeave={handleMouseLeave} 
            handleMouseEnter={handleMouseEnter} 
            bgRef={bgRef} 
            textRef={textRef}
            label={label}
        />
    );
}