type BaseButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    background?: boolean;
    disabled?: boolean;
}

export default function BaseButton({ label, type="submit", background=true, disabled=false }: BaseButtonProps) {
    return (
        <button 
            type={type} 
            className={`${background ? "bg-primary-700 text-white" : "bg-transparent text-white"} w-full text-normal
            p-2xs body hover:bg-primary-600 transition-colors duration-150 rounded-sm cursor-pointer`}
            disabled={disabled}
        >
            {label}
        </button>
    )
}