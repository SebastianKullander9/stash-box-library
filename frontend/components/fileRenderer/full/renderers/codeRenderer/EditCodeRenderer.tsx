"use client";

import { Code } from "@/types/code";
import FileSelector from "./FileSelector";
import EditCodeBlock from "./EditCodeBlock";
import { updateCodeFiles } from "@/actions/code";
import { useState } from "react";
import { CodeFile } from "@/types/code";
import { LANGUAGES } from "@/lib/code/languages";

interface EditCodeRendererProps {
	resource: Code;
}

export default function EditCodeRenderer({ resource }: EditCodeRendererProps) {
	const [files, setFiles] = useState<CodeFile[]>(resource.codeFiles);
	const [pendingDeletes, setPendingDeletes] = useState<string[]>([]);
	const action = updateCodeFiles.bind(null, resource.id);

	const togglePendingDelete = (id: string) => {
		setPendingDeletes(prev => 
			prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
		);
	}

	const updateFile = (id: string, changes: Partial<CodeFile>) => {
		setFiles((prevState) => prevState.map(file => file.id === id ? { ...file, ...changes } : file));
	};

	const deleteFile = (id: string) => {
		setFiles((prevState) => prevState.filter((file) => file.id !== id))
	};

	const addFile = () => {
		const newFile: CodeFile = {
			id: `new_${Date.now()}`,
			title: "Untitled",
			language: LANGUAGES[0].label,
			content: "",
			codeVersions: [],
		};

		setFiles((prevState) => [...prevState, newFile]);
	};

	return (
		<form 
			action={action} 
			className="contents"
		>
			<FileSelector 
				id={resource.id} 
				resource={files} 
				editMode={true} 
				onAddFile={addFile}
				pendingDeletes={pendingDeletes}
			>
				{files.map((file) => (
					<EditCodeBlock 
						key={file.id} file={file} 
						onDelete={() => deleteFile(file.id)} 
						onUpdate={(changes: Partial<CodeFile>) => updateFile(file.id, changes)}
						onTogglePendingDelete={() => togglePendingDelete(file.id)}
						isPendingDelete={pendingDeletes.includes(file.id)}
					/>
				))}
			</FileSelector>
		</form>
	);
};