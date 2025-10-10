type InputProps = {
    label?: string;
    name: string;
    type: string;
    defaultValue?: string;
}

export default function Input({ label="", name, type, defaultValue }: InputProps) {
    return (
        <label htmlFor={name} className="text-normal flex flex-col text-white gap-2">{label}
            <div className="relative">
                <input
                    className="w-full bg-[var(--color-white)] text-black p-2 rounded-sm"
                    defaultValue={defaultValue}
                    type={type}
                    name={name}
                    id={name}
                    placeholder={label}
                    required
                />
            </div>
        </label>
    )
}

                
