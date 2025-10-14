import { Resource } from "@/types";

type DefaultRendererProps = {
    resource: Resource;
    url: string;
} 

export default function Default({ resource, url }: DefaultRendererProps) {
    return (
        <h1>Hello default</h1>
    )
}