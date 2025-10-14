import { Resource } from "@/types";
import Renderer from "./Renderer";

type FileRendererThumbnailProps = {
    resources: Resource[];
}

export default function FileRendererThumbnail({ resources }: FileRendererThumbnailProps) {
    return (
        <div>
            {resources.map((resource) => (
                <Renderer key={resource.id} resource={resource} />
            ))}
        </div>
    )
}