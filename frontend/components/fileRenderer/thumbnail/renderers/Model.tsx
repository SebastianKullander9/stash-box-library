import { Resource } from "@/types";

type ModelRendererProps = {
    resource: Resource;
    url: string;
} 

export default function Model({ resource, url }: ModelRendererProps) {
    return (
        <h1 className="text-white">Hello Model</h1>
    )
}