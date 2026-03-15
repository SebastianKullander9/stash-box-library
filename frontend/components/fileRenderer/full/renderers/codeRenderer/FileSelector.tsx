"use client";

import { CodeFile } from "@/types/code";
import { File } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface FileSelectorProps {
	id?: string;
	resource: CodeFile[];
	children: React.ReactNode[];
	editMode?: boolean;
}

export default function FileSelector({ id, resource, children, editMode=false }: FileSelectorProps) {
	const files = resource;
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<>
			<div className="flex flex-col col-span-2 gap-xl">
				<div className="w-full rounded-lg sticky top-[115px] self-start flex flex-col gap-md">
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
				{editMode && (
					<div className="flex flex-col gap-md">
						<div>
							<div className="w-full rounded-t-lg self-start flex flex-col bg-surface p-md border-x border-t border-border-strong">
								<p>Change message</p>
							</div>
							<textarea 
								className="w-full border-x border-b border-border-strong rounded-b-lg p-md resize-none outline-none" 
								rows={5}
								placeholder="Your change message here..."
							/>
						</div>
						<div className="flex flex-row ">
							<Link 
								href={`/code/${id}`}
								className="
									w-full border-y border-l rounded-tl-lg rounded-bl-lg border-border-strong
								 	px-md py-xs hover:bg-surface-hover text-red-500 cursor-pointer text-center 
								"
							>
								Cancel
							</Link>
							<button
								type="submit"
								className="
									w-full border rounded-tr-lg rounded-br-lg border-border-strong px-md py-xs 
									hover:bg-surface-hover bg-surface cursor-pointer
								"
							>
								Save
							</button>
						</div>
					</div>
				)}
			</div>
			{children.map((child, index) => (
				<div key={index} className={index === selectedIndex ? "col-span-10" : "hidden"}>
					{child}
				</div>
			))}
		</>
	);
};