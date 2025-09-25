import { RefObject } from "react";

interface BaseButtonProps {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    textRef: RefObject<HTMLParagraphElement | null>;
    bgRef: RefObject<HTMLDivElement | null>;
}

export default function BaseButton({ handleMouseEnter, handleMouseLeave, textRef, bgRef }: BaseButtonProps) {
    return (
        <button
            className="relative px-4 py-2 border-1 rounded-full cursor-pointer overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p ref={textRef} className="relative z-10 text-black">Add Resource</p>
            <div
                ref={bgRef}
                className="absolute inset-0 bg-black translate-y-full"
            ></div>
        </button>
    );
}