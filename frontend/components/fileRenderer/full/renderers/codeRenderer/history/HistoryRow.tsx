import { Code, CodeSnapshot } from "@/types/code";
import FormattedDate from "@/components/ui/date/FormattedDate";
import { 
	CircleDot, 
	FileDiff, 
	Files,
} from "lucide-react";
import Link from "next/link";

interface HistoryRowProps {
	snapshot: CodeSnapshot;
	resource: Code;
}

export default function HistoryRow({ snapshot, resource }: HistoryRowProps) {
	return (
		<div
			key={snapshot.id}
			className="flex flex-row items-center"
		>
			<div className="p-md">
				<CircleDot className="text-text-secondary" />
			</div>
			
			<div className="bg-surface p-md flex-1 rounded-lg border border-border flex flex-row items-center justify-between">
				<div>
					<p>
						{snapshot.message}
					</p>
					<div className="text-text-tertiary text-xs">
						<FormattedDate createdAt={snapshot.createdAt} />
					</div>
				</div>
				<div className="flex rounded-lg overflow-hidden border border-border-strong">
					<Link 
						href={`/code/${resource.id}/diff/${snapshot.id}`}
						className="p-xs bg-hover border-r border-border-strong hover:bg-surface-hover cursor-pointer active:bg-surface-active"
					>
						<FileDiff size={20} />
					</Link>
					<div className="p-xs bg-hover hover:bg-surface-hover cursor-pointer active:bg-surface-active">
						<Files size={20} />
					</div>
				</div>
			</div>
		</div>
	);
};