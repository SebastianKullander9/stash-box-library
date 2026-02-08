import { Resource } from "@/types";
import DownloadButton from "@/components/ui/buttons/DownloadButton";
import FormattedDate from "@/components/ui/date/FormattedDate";
import MasonryGrid from "./MasonryGrid";

type ImageRendererProps = {
    resource: Resource;
	colSpan: string;
} 

export default function ImageRenderer({ resource, colSpan }: ImageRendererProps) {
    console.log(resource.files[0].url)

    return (
        <div className={`${colSpan} flex flex-col gap-xl section-x-padding sm:px-0`}>
			<div className="bg-surface p-xl rounded-lg flex flex-col gap-xl">
				<div className="flex flex-col md:flex-row md:justify-between md:items-center">
					<h2 className="heading-4">
						{resource.title}
					</h2>
					<div className="text-text-tertiary">
						<FormattedDate createdAt={resource.createdAt} />
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-xl justify-between">
					<p className="flex flex-col max-w-prose text-text-secondary">
						{resource.description}
						{resource.textContent}
					</p>
					<div>
						<DownloadButton label="Get images" url="" />
					</div>
				</div>
			</div>
			
			<MasonryGrid resource={resource} />
		</div>
    )
}