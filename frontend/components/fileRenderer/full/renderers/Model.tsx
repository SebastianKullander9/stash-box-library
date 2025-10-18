"use client";

import { Resource } from "@/types";
import Canvas3d from "@/components/3d-viewer/canvas/Canvas3d";
import FormattedDate from "@/components/ui/date/FormattedDate";
import Tags from "@/components/ui/tags/Tags";
import DownloadButton from "@/components/ui/buttons/DownloadButton";

type ModelProps = {
    resource: Resource;
}

export default function Model({ resource }: ModelProps) {
    const modelUrl = resource.files[0].url;

    return (
        <div className="text-white h-[calc(100vh-120px)] flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 h-[calc(50%-60px)] md:h-full md:h-full cursor-grab order-2 md:order-1">
                <Canvas3d modelUrl={modelUrl} />
            </div>

            <div className="w-full md:w-2/5 h-[calc(50%-60px)] md:h-full flex flex-col justify-between order-1 md:order-2">
                <div>
                    <div className="flex flex-row justify-between">
                        <h1>{resource.title}</h1>
                        <FormattedDate createdAt={resource.createdAt}/>
                    </div>
                    <p>{resource.description}</p>
                </div>
                
                <div className="flex flex-row justify-between">
                    <Tags resource={resource} />
                    <DownloadButton label="model" url={modelUrl} />
                </div>
            </div>
        </div>
    )
}
