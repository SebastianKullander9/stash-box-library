"use client";

import { CodeFile } from "@/types/code";
import { File } from "lucide-react";
import { useState } from "react";

interface FileSelectorProps {
	resource: CodeFile[];
	children: React.ReactNode[];
}

export default function FileSelector({ resource, children }: FileSelectorProps) {
	const files = resource;
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<>
			<div className="col-span-2 rounded-lg sticky top-[115px] self-start flex flex-col gap-md">
				<div className="bg-surface p-md rounded-lg">
					<p>
						Files
					</p>
				</div>
				<div className="flex flex-col gap-1">
					{files.map((file, index) => (
						<div
							key={file.id}
							onClick={() => setSelectedIndex(index)}
							className={`

								flex flex-row items-center gap-1 text-xs text-text-secondary px-md py-xs cursor-pointer hover:bg-surface rounded-lg
								${selectedIndex === index ? "bg-surface text-white" : ""}
							`}
						>
							<File size={16} />
							<p>
								{file.title}
							</p>
						</div>
					))}
				</div>
			</div>
			{children[selectedIndex]}
		</>
	);
};