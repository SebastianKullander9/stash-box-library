type InputProps = {
    label: string;
    name: string;
    type: string;
}

export default function Input({ label, name, type}: InputProps) {
    return (
        <label htmlFor={name} className="text-normal flex flex-col text-white gap-2">{label}
            <input
                className="bg-[var(--color-white)] p-2 rounded-sm"
                type={type}
                name={name}
                id={name}
                placeholder={label}
                required
            />
        </label>
    )
}