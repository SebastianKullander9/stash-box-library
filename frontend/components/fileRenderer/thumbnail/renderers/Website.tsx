import { ResourceFile } from "@/types";

type WebsiteRendererProps = {
    file: ResourceFile;
} 

export default function Website({ file }: WebsiteRendererProps) {
    return (
        <h1>Hello Website</h1>
    )
}