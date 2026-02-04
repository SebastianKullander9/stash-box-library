interface FontInputProps {
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	className: string;
}

export default function FontInput({ state, setState, className }: FontInputProps) {
	return (
		<input
			name="fontPreview"
			type="text"
			placeholder="Type here to preview text"
			className={className}
			onChange={(e) => setState(e.target.value)}
			value={state}
		/>
	);
};