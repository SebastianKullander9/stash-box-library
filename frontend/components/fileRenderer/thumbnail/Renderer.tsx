import { Resource } from "@/types";
import Default from "./renderers/Default";
import ImgThumbnail from "./renderers/ImgThumbnail";
import Model from "./renderers/Model";
import Video from "./renderers/Video";
import FontThumbnail from "./renderers/fontThumbnail/FontThumbnail";

type RendererProps = {
    resource: Resource;
}

export default function Renderer({ resource }: RendererProps) {
    const file = resource.files[0];
    if (!file) return null;

    const { url, fileType } = file;

    if (fileType.startsWith("image/")) return <ImgThumbnail resource={resource} url={url} />
    if (fileType.startsWith("model/")) return <Model resource={resource} url={url} />
    if (fileType.startsWith("font/")) return <FontThumbnail resource={resource} url={url} />

    return <Default resource={resource} url={url} />
}