interface FontSizeSelectProps {
	name: string;
	options: number[];
	state: number;
	setState: React.Dispatch<React.SetStateAction<number>>;
}

export default function FontSizeSelect({name, options, state, setState}: FontSizeSelectProps) {
	return (
		<select
			className="p-md bg-surface rounded-md"
			name={name}
			id={name}
			required
			value={state}
			onChange={(e) => setState(Number(e.target.value))}
		>
			{options.map((option, index) => (
				<option
					key={index}
					value={option}

					className="text-white"
				>
					{option}px
				</option>
			))}		
		</select>
	);
};