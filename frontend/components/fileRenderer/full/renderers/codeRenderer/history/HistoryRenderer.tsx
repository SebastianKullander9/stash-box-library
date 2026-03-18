import { Code } from "@/types/code";
import HistoryList from "./HistoryList";

interface HistoryRendererProps {
	resource: Code;
}

export default function HistoryRenderer({ resource }: HistoryRendererProps) {
	return (
		<div className="col-span-12 rounded-lg flex flex-col gap-md">
			<div className="p-md">
				<p>
					History
				</p>
			</div>
			<HistoryList resource={resource}/>
		</div>
	);
};