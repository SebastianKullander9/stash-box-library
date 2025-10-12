

type option = {
    id: string;
    name: string;
}

type InputProps = {
    label?: string;
    name: string;
    options: option[];
    multiple?: boolean;
    defaultValue?: option[] | string;
    passIds?: boolean;
}

export default function Select({ label="", name, options, multiple=false, defaultValue, passIds=false }: InputProps) {
    let computedDefaultValue: string | string[] | undefined;

    if (Array.isArray(defaultValue)) {
        computedDefaultValue = defaultValue.map(opt =>
            passIds ? opt.id : opt.name
        );
    } else if (typeof defaultValue === "string") {
        computedDefaultValue = defaultValue;
    }


    return (
        <label htmlFor={name} className="text-normal flex flex-col text-white gap-2">{label}
            <div className="relative">
                <select
                    className="w-full bg-[var(--color-white)] text-black p-2 rounded-sm cursor-pointer"
                    name={name}
                    id={name}
                    required
                    size={options.length}
                    multiple={multiple}
                    defaultValue={computedDefaultValue}
                >
                    {options.map((option) => (
                        <option key={option.id} value={passIds ? option.id: option.name}>{option.name}</option>

                    ))}
                </select>
                {multiple && <p className="text-[12px] text-gray-400">To select multiple options on windows/mac hold CTRL/cmd</p>}
            </div>
        </label>
    )
}