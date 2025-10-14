import { Resource } from "@/types";

type VideoRendererProps = {
    resource: Resource;
    url: string;
} 

export default function Video({ resource, url }: VideoRendererProps) {
    return (
        <h1>Hello Video</h1>
    )
}