import OpenResourceButton from "@/components/ui/buttons/OpenResourceButton";
import { Resource } from "@/types";
import FormattedDate from "@/components/ui/date/FormattedDate";

type ModelRendererProps = {
    resource: Resource;
    url: string;
} 

export default function ModelThumbnail({ resource, url }: ModelRendererProps) {
	console.log("test")

    return (
        <div className="bg-surface p-md rounded-md w-full flex flex-col gap-xl ">
			<div className="flex flex-col gap-md">
				<div className="flex flex-row justify-between items-center">
					<h6>
						{resource.title}
					</h6>
					<div className="text-xs text-text-secondary">
						<FormattedDate createdAt={resource.createdAt} />
					</div>
				</div>

				
				<p className="text-text-secondary">
					{resource.description}
				</p>
			</div>

			<OpenResourceButton category="models" resource={resource}/>
        </div>
    )
}