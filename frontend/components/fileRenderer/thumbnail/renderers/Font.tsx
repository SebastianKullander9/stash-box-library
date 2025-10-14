import { ResourceFile } from "@/types";

type FontRendererProps = {
    file: ResourceFile;
} 

export default function Font({ file }: FontRendererProps) {
    return (
        <h1>Hello font</h1>
    )
}