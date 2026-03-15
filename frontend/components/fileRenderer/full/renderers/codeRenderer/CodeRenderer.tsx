import CodeBlock from "./CodeBlock";
import { Code } from "@/types/code";
import FileSelector from "./FileSelector";
import CodeHeader from "./CodeHeader";

interface CodeRendererProps {
	resource: Code;
}

export default function CodeRenderer({ resource }: CodeRendererProps) {
	return (
		<FileSelector resource={resource.codeFiles}>
			{resource.codeFiles.map((file) => (
				<CodeBlock key={file.id} file={file} />
			))}
		</FileSelector>
	);
};