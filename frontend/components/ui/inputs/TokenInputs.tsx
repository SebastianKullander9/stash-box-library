"use client";

import { useState } from "react";
import Select from "./Select";

const roleOptions = [
	{ name: "primary" },
	{ name: "secondary" },
	{ name: "accent" },
	{ name: "success" },
	{ name: "warning" },
	{ name: "error" },
	{ name: "danger" },
	{ name: "info" },
	{ name: "neutral" },
	{ name: "background" },
	{ name: "surface" },
	{ name: "text" },
	{ name: "border" },
];

interface TokenInputsProps {
	onErrorsChange?: (errors: Record<number, string>) => void;
}

export default function TokenInputs({ onErrorsChange }: TokenInputsProps) {
	const [tokenCount, setTokenCount] = useState(1);
	const [errors, setErrors] = useState<Record<number, string>>({});

	const validateHex = (value: string, index: number) => {
		const isValid = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

		const newErrors = {
			...errors,
			[index]: isValid || !value ? '' : 'Must be a valid hex color.'
		};

		setErrors(newErrors);
		onErrorsChange?.(newErrors);
	}

	const addToken = () => {
		setTokenCount((prev) => prev + 1);
	}

	const removeToken = () => {
		const newCount = Math.min(1, tokenCount - 1);
		setTokenCount(newCount);

		const newErrors = { ...errors };
		delete newErrors[tokenCount - 1];
		setErrors(newErrors);
		onErrorsChange?.(newErrors);
	}

	return (
		<div className="flex flex-col gap-md">
			<h3 className="heading-6">Tokens</h3>
			
			{Array.from({ length: tokenCount }).map((_, index) => (
				<div key={index} className="flex gap-xl items-end border border-border-strong p-md rounded-lg">
					<div className="flex-1">
						<Select 
							label={`Token ${index + 1}`}
							name={`tokens[${index}].role`}
							options={roleOptions}
						/>
					</div>
					<div className="flex-1 flex flex-col text-sm">
						<label>
							Color
						</label>
						<input
							className="p-xs rounded-lg bg-white text-black"
							name={`tokens[${index}].value`}
							type="text"
							onChange={(e) => validateHex(e.target.value, index)}
							required
						/>
						<p className="text-xs text-red-500">
							{errors[index] && errors[index]}
						</p>
					</div>

				</div>
			))}

			<div className="flex flex-row justify-between">
				<button
					type="button"
					onClick={addToken}
					className="text-left text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
				>
					+ Add Token
				</button>
				{tokenCount > 1 && (
					<button
						type="button"
						onClick={removeToken}
						className="px-sm py-xs text-red-500 hover:text-red-400 cursor-pointer"
					>
						Remove
					</button>
				)}
			</div>
		</div>
	);
};