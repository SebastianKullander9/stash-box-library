import CodeBlock from "./CodeBlock";
import { Code } from "@/types/code";

interface CodeRendererProps {
	resource: Code;
}

export default function CodeRenderer({ resource }: CodeRendererProps) {
	return (
		<div className="grid grid-cols-12">
			<CodeBlock resource={resource}/>
		</div>
	);
};