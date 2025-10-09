type BaseButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
}

export default function BaseButton({ label, type="submit" }: BaseButtonProps) {
    return (
        <button type={type} className="w-full bg-[var(--color-white)] text-black text-normal p-2 p-normal rounded-sm">
            {label}
        </button>
    )
}