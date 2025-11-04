import { Resource } from "@/types";
import Image from "next/image";
import FormattedDate from "@/components/ui/date/FormattedDate";
import Tags from "@/components/ui/tags/Tags";

interface ImageThumbnailProps {
    resource: Resource;
    url: string
} 

export default function ImgThumbnail({ resource, url }: ImageThumbnailProps) {
    console.log(resource)

    return (
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
    )
}

/* 
    <div className="flex flex-row justify-between items-center">
        <h1 className="text-white text-lg mb-0">{resource.title}</h1>
        <OpenResourceButton category="images" resource={resource} />
    </div>
    <p className="text-white p-normal text-normal">{resource.description}</p>
    <div className="relative rounded-sm overflow-hidden mb-4">
        <Image src={url} alt="resource thumbnail image" width={800} height={0} />
    </div>
    <div className="flex flex-row gap-2">
        {resource.tags.map((tag, index) => (
            <p className="py-2 px-4 bg-white inline-block rounded-full" key={index}>{tag.name}</p>
        ))}
    </div>
*/