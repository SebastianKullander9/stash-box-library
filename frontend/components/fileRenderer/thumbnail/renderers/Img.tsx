import { Resource } from "@/types";
import Image from "next/image";
import openIcon from "../../../../public/svgs/square-arrow-out-up-right.svg";

type ImageRendererProps = {
    resource: Resource;
    url: string
} 

export default function Img({ resource, url }: ImageRendererProps) {
    return (
        <div className="main-x-padding main-y-padding border-b-1 border-b-white max-w-[850px] mx-auto">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-white text-lg mb-0">{resource.title}</h1>
                <a href={`/images/${resource.id}`} className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                    <Image width={20} height={20} src={openIcon} alt={`open ${resource.title}`} className="brightness-0 invert" />
                </a>
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