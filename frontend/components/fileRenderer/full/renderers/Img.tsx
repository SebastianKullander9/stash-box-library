import { Resource } from "@/types";
import Image from "next/image";
import DownloadButton from "@/components/ui/buttons/DownloadButton";
import FormattedDate from "@/components/ui/date/FormattedDate";
import Tags from "@/components/ui/tags/Tags";

type ImageRendererProps = {
    resource: Resource;
} 

export default function Img({ resource }: ImageRendererProps) {
    console.log(resource.files[0].url)

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-120px)] main-x-padding main-y-padding gap-12">

            <div className="w-full md:w-7/10 flex flex-col gap-12 md:gap-24 md:overflow-y-auto hide-scrollbar order-2 md:order-1">
                {resource.files.map((file, index) => (
                    <div key={index} className="relative aspect-[16/9] flex-shrink-0 w-full">
                        <Image src={file.url} alt={`resource image ${index + 1}`} fill className="object-cover"/>
                    </div>
                ))}
            </div>

            <div className="w-full md:w-3/10 flex flex-col justify-between text-white md:overflow-hidden md:order-2">
                <div className="mb-12 md:mb-0">
                    <div className="flex flex-row  justify-between md:mb-12">
                        <div>
                            <h1 className="mb-0">{resource.title}</h1>
                            <p className="text-gray-400">{resource.files.length} Images</p>
                        </div>
                        <FormattedDate createdAt={resource.createdAt} />
                    </div>
                    <p>{resource.description}</p>
                    <a href={resource.textContent} target="_blank" className="underline underline-offset-3 hover:text-gray-400">View here</a>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <Tags resource={resource} />
                    </div>
                    <DownloadButton label={resource.files.length > 1 ? "images" : "image"} url="" />
                </div>
            </div>

        </div>
    )
}

/*  
                    <div className="h-screen flex-shrink-0 bg-red-200" key={index}>

                    </div>
*/