"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface BaseInputProps {
    label: string;
    type?: string;
    state: string;
    setState: (value: string) => void;
}

export default function BaseInput({ label, type, state, setState }: BaseInputProps ) {
    const textRef = useRef<HTMLLabelElement>(null);

    const animateLabel = (props: gsap.TweenVars) => {
        gsap.to(textRef.current, { duration: 0.15, ...props});
    };

    const handleFocus = () => {
        animateLabel({ y: "-55%", fontSize: "14px", color: "gray" });
    };
    
    const handleBlur = () => {
        if (!state) {
            animateLabel({ y: "0%", fontSize: "16px", color: "black" });
        }    
    };

    return (
        <div className="relative py-2">
            <label 
                ref={textRef} 
                className="translateLabel absolute py-2 pointer-events-none text-base"
                htmlFor={label}
            >
                {label}
            </label>
            <input
                id={label}
                value={state}
                type={type || "text"}
                onChange={(event) => setState(event.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full border-b-1 py-2 focus:outline-none focus:ring-0 appearance-none"
            />
        </div>

    );
}