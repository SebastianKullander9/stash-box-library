import OpenResourceButton from "@/components/ui/buttons/OpenResourceButton";
import { Resource } from "@/types";

type ModelRendererProps = {
    resource: Resource;
    url: string;
} 

export default function Model({ resource, url }: ModelRendererProps) {
    return (
        <div className="text-white border-b-1 border-b-[var(--color-white)] mb-4">
            <div className="flex flex-row justify-between">
                <h1 className="mb-4">{resource.title}</h1>
                <OpenResourceButton category="models" resource={resource} />
            </div>
            <p>{resource.description}</p>
        </div>
        
    )
}