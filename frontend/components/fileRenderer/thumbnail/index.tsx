import { Resource } from "@/types";
import Renderer from "./Renderer";

type FileRendererThumbnailProps = {
    resources: Resource[];
	colSpan?: string;
}

export default function FileRendererThumbnail({ resources, colSpan }: FileRendererThumbnailProps) {
    return (
        <>
            {resources.map((resource) => (
                <div key={resource.id} className={colSpan}>
                    <Renderer resource={resource} />
                </div>
            ))}
        </>
    )
}