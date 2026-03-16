"use client";

import "./CodeBlock.css";
import { CodeFile } from "@/types/code";
import { Code } from "@/types/code";
import { SquareCheckBig } from "lucide-react";
import { Square } from "lucide-react";
import { Trash2 } from "lucide-react";
import { LANGUAGES } from "@/lib/code/languages";

interface EditCodeBlockProps {
	file: CodeFile;
	onDelete: () => void;
	onUpdate: (changes: Partial<CodeFile>) => void;
	onTogglePendingDelete: () => void;
	isPendingDelete: boolean;
}

export default function EditCodeBlock({ file, onDelete, onUpdate, onTogglePendingDelete, isPendingDelete }: EditCodeBlockProps) {
	const isNewFile = file.id.startsWith("new_");
	const Icon = isPendingDelete ? SquareCheckBig : Square;

	return (
		<div>
			<div className="flex flex-row items-center justify-between bg-surface rounded-t-lg border-x border-t border-border-strong px-md py-xs">
				<div className="flex flex-row gap-xs">
					<input
						className="bg-surface-hover px-md py-xs rounded-lg border border-border-strong"
						value={file.title}
						onChange={(e) => onUpdate({ title: e.target.value })}
						name={`title_${file.id}`}
					/>
					<select
						className="bg-surface-hover border border-border-strong p-xs rounded-lg"
						name={`language_${file.id}`}
						value={file.language}
  						onChange={(e) => onUpdate({ language: e.target.value })}
					>
						{LANGUAGES.map((lang) => (
							<option
								key={lang.value}
								value={lang.value}
							>
								{lang.label}
							</option>
						))}
					</select>
				</div>
				
				<div>
					<input type="hidden" name="fileIds" value={file.id} />
					<input 
						type="checkbox" 
						name={`delete_${file.id}`} 
						className="hidden" 
						checked={isPendingDelete}
						onChange={() => {}}
						id={`delete_${file.id}`} 
					/>
					{isNewFile ? (
						<div
							onClick={onDelete}
							className="flex flex-row gap-1 border border-border-strong p-xs rounded-lg items-center cursor-pointer hover:bg-surface-hover"
						>
							<Trash2 size={20} />
							<p>
								Remove file
							</p>
						</div>
					) : (
						<div 
							onClick={() => { onTogglePendingDelete() }}
							className="flex flex-row gap-1 border border-border-strong p-xs rounded-lg items-center cursor-pointer hover:bg-surface-hover"
						>
							<Icon size={20} />
							<p>
								Delete file
							</p>
						</div>
					)}
				</div>
			</div>
			<textarea 
				className="w-full text-[12px] font-mono bg-[#121212] text-[#ddd] p-md rounded-b-lg border-b border-x border-border-strong resize-none outline-none"
				defaultValue={file.content}
                spellCheck={false}
				rows={file.content.split("\n").length}
				name={`content_${file.id}`}
			/>
		</div>
	);
};