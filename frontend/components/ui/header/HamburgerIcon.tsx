interface HamburgerIconProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function hamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
    return (
        <div className="relative pr-8">
            <div className={`
                relative transition-all  cursor-pointer before:duration-300 after:duration-300 z-[20]
                before:content-[''] before:absolute before:w-8 before:h-[2px] before:bg-white before:-top-2 before:origin-[13%]
                after:content-[''] after:absolute after:w-8 after:h-[2px] after:bg-white after:top-2 after:origin-[13%]
                ${isOpen ? "after:-rotate-45 before:rotate-45" : ""}
                `}
                onClick={onClick}
            ></div>
        </div>
    );
}