type option = {
    id: string;
    name: string;
}

interface SelectProps  {
    label: string;
    name: string;
    options: option[];
    defaultValue?: option[] | string;
}

export default function Select({ label="", name, options }: SelectProps) {
    let computedDefaultValue: string | string[] | undefined;

    return (
        <label htmlFor={name} className="text-white body">{label}
            <div className="relative bg-white rounded-md">
                <select
                    className="w-full cursor-pointer text-background p-sm"
                    name={name}
                    id={name}
                    required
                >
                    {options.map((option) => (
                        <option 
                            key={option.name}
                            value={option.name}
                            className=""
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </label>
    )
}