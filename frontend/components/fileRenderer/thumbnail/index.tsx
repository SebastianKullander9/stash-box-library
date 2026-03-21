import { Resource } from "@/types";
import Renderer from "./Renderer";
import EmptyState from "@/components/ui/emptyState/EmptyState";

type FileRendererThumbnailProps = {
    resources: Resource[];
	colSpan?: string;
}

export default function FileRendererThumbnail({ resources, colSpan }: FileRendererThumbnailProps) {
	if (!resources.length) return <EmptyState message="No resources uploaded yet..." />

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