import { Resource } from "@/types";
import Image from "next/image";
import FormattedDate from "@/components/ui/date/FormattedDate";
import Tags from "@/components/ui/tags/Tags";
import Link from "next/link";

interface ImageThumbnailProps {
    resource: Resource;
    url: string,
} 

export default function ImgThumbnail({ resource, url }: ImageThumbnailProps) {
    return (
		<Link 
			className="bg-surface rounded-lg p-lg w-full inline-block border-1 border-surface hover:border-text-tertiary min-h-90"
			href={`/images/${resource.id}`}
		>
			<div className="flex flex-col gap-md">
				<div className="flex flex-row items-center justify-between">
					<div>
						<p className="text-base">
							{resource.title}
						</p>
					</div>
					<div className="text-text-tertiary text-xs">
						<FormattedDate createdAt={resource.createdAt} />
					</div>
				</div>
				<p className="text-sm text-text-secondary line-clamp-1">
					{resource.description}
				</p>
				<div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
					<Image
						src={url}
						alt=""
						fill
						className="object-cover"
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
					/>
				</div>
				<div className="flex flex-row gap-sm flex-wrap">
					<Tags resource={resource}/>
				</div>
			</div>
		</Link>
    )
}