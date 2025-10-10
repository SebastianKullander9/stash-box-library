type BaseButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    background?: boolean;
}

export default function BaseButton({ label, type="submit", background=true }: BaseButtonProps) {
    return (
        <button 
            type={type} 
            className={`${background ? "bg-[var(--color-white)] text-black" : "bg-transparent text-white"} w-full text-normal
            p-2 p-normal hover:bg-gray-300 transition-colors duration-200 rounded-sm cursor-pointer`}
        >
            {label}
        </button>
    )
}