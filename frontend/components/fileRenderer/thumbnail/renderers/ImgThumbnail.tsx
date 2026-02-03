import { Resource } from "@/types";
import Image from "next/image";
import FormattedDate from "@/components/ui/date/FormattedDate";
import Tags from "@/components/ui/tags/Tags";

interface ImageThumbnailProps {
    resource: Resource;
    url: string
} 

export default function ImgThumbnail({ resource, url }: ImageThumbnailProps) {
    return (
		<div className=" bg-red-500 ">
			<div>
				<p>test</p>
			</div>
			<div>

			</div>
		</div>
    )
}

/*
        <a 
            className="flex flex-col p-2xl bg-surface border-1 border-border rounded-sm shadow-sm gap-xl hover:border-border-strong transition-border duration-150 cursor-pointer"
            href={`/images/${resource.id}`}
        >
            <div className="w-full h-55 overflow-hidden">
                <Image src={url} alt="resource thumbnail image" width={800} height={0} className="object-cover"/>
            </div>
            <div className="flex flex-row gap-md">
                <div className="w-full flex flex-col gap-lg">
                    <div>
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="body">
                                {resource.title}
                            </h3>
                            <div className="body-smallest text-text-secondary">
                                <FormattedDate createdAt={resource.createdAt} />
                            </div>
                        </div>
                        <p className="body-small text-text-secondary">
                            {resource.description}
                        </p>
                    </div>
                    <div className="flex flex-row gap-sm">
                        <Tags resource={resource} />
                    </div>
                </div>
            </div>
        </a>

*/