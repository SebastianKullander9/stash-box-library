type option = {
    id?: string;
    name?: string;
	label?: string;
	value?: string;
}

interface SelectProps  {
    label: string;
    name: string;
    options: readonly option[];
    defaultValue?: option[] | string;
}

export default function Select({ label="", name, options }: SelectProps) {
    let computedDefaultValue: string | string[] | undefined;

    return (
        <label htmlFor={name} className="text-white text-sm body">{label}
            <div className="relative bg-white rounded-md">
                <select
                    className="w-full cursor-pointer text-background p-xs text-sm"
                    name={name}
                    id={name}
                    required
                >
                    {options.map((option) => (
                        <option 
                            key={option.value ? option.value : option.name}
                            value={option.value ? option.value : option.name}
                            className="text-sm"
                        >
                            {option.label ? option.label : option.name}
                        </option>
                    ))}
                </select>
            </div>
        </label>
    )
}