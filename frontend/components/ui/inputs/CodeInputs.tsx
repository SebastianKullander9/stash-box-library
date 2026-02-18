"use client";

import { CodeFile } from "@/types/code";
import { useState } from "react";
import Select from "./Select";
import Input from "./Input";
import CodeBlockInput from "./CodeBlockInput";

const languages = [
	{ name: "JSX" },
	{ name: "Javascript" },
	{ name: "Typescript" },
	{ name: "Css" },
	{ name: "Html" },
]

export default function CodeInputs() {
	const id = crypto.randomUUID();
	const [codeFiles, setCodeFiles] = useState<CodeFile[]>([
		{ 
			id: id, 
			title: "", 
			language: "", 
			content: "",
		}
	]);

	const addCodeFile = () => {
		setCodeFiles((prev) => [...prev, {
			id: crypto.randomUUID(), 
			title: "", 
			language: "", 
			content: "",
		}]);
	}

	const removeCodeFile = (id: string) => {
		setCodeFiles((prev) => prev.filter((token) => token.id !== id));
	}

	return (
		<div className="flex flex-col gap-md">
			{codeFiles.map((codeFile, index) => (
				<div
					className="rounded-lg p-md border-1 border-border-strong flex flex-col gap-md"
					key={codeFile.id}
				>
					<div className="grid grid-cols-10 gap-md">
						<div className="col-span-7">
							<Input 
								label="Title"
								name={`title[${index}]`}
								type="text"
								defaultValue=""
							/>
						</div>
						<div className="col-span-3">
							<Select 
								label="Language"
								name={`language[${index}]`}
								options={languages}
							/>
						</div>
					</div>
					<CodeBlockInput index={index} />
					{codeFiles.length > 1 && (
						<button
							onClick={() => removeCodeFile(codeFile.id)}
							className="text-red-500 text-end hover:text-red-600"
						>
							Remove code block
						</button>
					)}
				</div>
			))}
			<div>
				<button
					type="button"
					onClick={addCodeFile}
					className="text-blue-400 hover:text-blue-500"
				>
					+ Add Code Block
				</button>
			</div>
		</div>
	);
};