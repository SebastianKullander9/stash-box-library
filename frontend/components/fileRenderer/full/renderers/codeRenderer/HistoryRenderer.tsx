import { Code } from "@/types/code";

interface HistoryRendererProps {
	resource: Code;
}

export default function HistoryRenderer({ resource }: HistoryRendererProps) {
	return (
		<div className="col-span-12 rounded-lg flex flex-col gap-md">
			<div className="p-md border-b border-border-strong">
				<p>
					Changes
				</p>
			</div>

			{resource.snapshots.map((snapshot) => (
				<div
					key={snapshot.id}
					className="bg-surface rounded-lg p-md"
				>
					{snapshot.message}
				</div>
			))}
		</div>
	);
};