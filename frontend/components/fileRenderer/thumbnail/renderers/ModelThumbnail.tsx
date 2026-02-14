import Link from "next/link";
import { Resource } from "@/types";
import FormattedDate from "@/components/ui/date/FormattedDate";

type ModelRendererProps = {
    resource: Resource;
    url: string;
} 

export default function ModelThumbnail({ resource, url }: ModelRendererProps) {
    return (
        <Link 
			className="w-full bg-surface rounded-lg p-md flex flex-col gap-md border-1 border-surface hover:border-border-strong"
			href={`/models/${resource.id}`}
		>
			<div className="flex flex-row justify-between">
				<h2 className="heading-6">
					{resource.title}
				</h2>
				<div className="text-text-tertiary text-xs">
					<FormattedDate createdAt={resource.createdAt} />
				</div>
			</div>
			<p className="text-text-secondary">
				{resource.description}
			</p>
			<div className="h-60 bg-border rounded-lg flex justify-center items-center">
				<p>PLACEHOLDER</p>
			</div>
        </Link>
    );
}