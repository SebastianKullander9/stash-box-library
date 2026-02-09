"use client";

import { useState } from "react";
import Input from "./Input";
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

export default function TokenInputs() {
	const [tokenCount, setTokenCount] = useState(1);

	const addToken = () => {
		setTokenCount((prev) => prev + 1);
	}

	const removeToken = () => {
		setTokenCount(prev => Math.max(1, prev - 1));
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
					<div className="flex-1">
						<Input
							label="Color"
							name={`tokens[${index}].value`}
							type="text"
						/>
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