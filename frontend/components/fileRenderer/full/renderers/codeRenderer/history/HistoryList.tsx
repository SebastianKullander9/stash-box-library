import { Code } from "@/types/code";
import HistoryRow from "./HistoryRow";
import { Flag } from "lucide-react";
import FormattedDate from "@/components/ui/date/FormattedDate";

interface HistoryListProps {
	resource: Code;
}

export default function HistoryList({ resource }: HistoryListProps ) {
	return (
		<div className="flex flex-col gap-xl">
			{resource.snapshots.map((snapshot) => (
				<HistoryRow 
					snapshot={snapshot} 
					key={snapshot.id} 
					resource={resource} 
				/>
			))}
			<div className="p-md text-text-secondary flex flex-row gap-md">
				<div className="">
					<Flag />
				</div>
				<div className="flex flex-row gap-1 text-xs">
					<p>
						Resource created 
					</p>
					<FormattedDate createdAt={resource.createdAt}/>
				</div>
			</div>
		</div>
	);
};