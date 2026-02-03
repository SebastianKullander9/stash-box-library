import { Resource } from "@/types";
import Renderer from "./Renderer";

type FileRendererThumbnailProps = {
    resources: Resource[];
}

export default function FileRendererThumbnail({ resources }: FileRendererThumbnailProps) {
    return (
        <>
            {resources.map((resource) => (
                <div key={resource.id} className="col-span-3">
                    <Renderer resource={resource} />
                </div>
            ))}
        </>
    )
}