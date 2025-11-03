import { Resource } from "@/types";
import Image from "next/image";
import OpenResourceButton from "@/components/ui/buttons/OpenResourceButton";

interface ImageThumbnailProps {
    resource: Resource;
    url: string
} 

export default function ImgThumbnail({ resource, url }: ImageThumbnailProps) {
    return (
        <div className="main-x-padding main-y-padding border-b-1 border-b-white max-w-[850px] mx-auto">
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
        </div>
    )
}