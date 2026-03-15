import { Code } from "@/types/code";

interface HistoryRendererProps {
	resource: Code;
}

export default function HistoryRenderer({ resource }: HistoryRendererProps) {
	const singleResource = resource.codeFiles[0];

	return (
		<div className="col-span-12 bg-surface rounded-lg">
			<p>test</p>
		</div>
	);
};