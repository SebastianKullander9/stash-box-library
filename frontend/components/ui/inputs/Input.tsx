type InputProps = {
    label?: string;
    name: string;
    type: string;
    defaultValue?: string;
}

export default function Input({ label="", name, type, defaultValue }: InputProps) {
    return (
        <label htmlFor={name} className="body text-sm">{label}
            <div>
                <input
                    className="rounded-sm bg-white text-background text-sm p-xs w-full"
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

                
