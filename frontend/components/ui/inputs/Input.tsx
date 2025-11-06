type InputProps = {
    label?: string;
    name: string;
    type: string;
    defaultValue?: string;
}

export default function Input({ label="", name, type, defaultValue }: InputProps) {
    return (
        <label htmlFor={name} className="body">{label}
            <div>
                <input
                    className="rounded-md bg-white text-background p-sm w-full"
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

                
