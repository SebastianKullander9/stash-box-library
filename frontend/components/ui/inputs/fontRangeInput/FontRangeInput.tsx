import "./fontRangeInput.css";

interface FontRangeInputProps {
	options: number[];
	state: number;
	setState: React.Dispatch<React.SetStateAction<number>>;
}

export default function FontRangeInput({ options, state, setState }: FontRangeInputProps) {
	const min = options[0];
  	const max = options[options.length - 1];
	const percentage = ((state - min) / (max - min)) * 100;

	return (
		<input
			type="range"
			min={min}
			max={max}
			value={state}
			onChange={(e) => setState(Number(e.target.value))}
			className="range-slider"
			style={{
				background: `linear-gradient(
								to right, var(--color-primary-600) 0%, var(--color-primary-600) ${percentage}%, 
								var(--color-primary-300) ${percentage}%, var(--color-primary-300) 0%)`
			}}
		/>
	);
};