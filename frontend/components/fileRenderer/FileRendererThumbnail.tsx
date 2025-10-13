import { ResourceFile } from "@/types";
import Image from "next/image";

type FileRendererThumbnailProps = {
    files: ResourceFile[];
}

export default function FileRendererThumbnail({ files }: FileRendererThumbnailProps) {
    return (
        <div className="text-white">
            {files.map((file) => {
                const { url, fileType } = file;
                console.log(url);

                if (fileType.startsWith("image/")) {
                    return (
                        <a href={url} target="_blank" key={url} className="relative">
                            <Image src={url} alt="" width={800} height={0} className="w-full h-auto object-contain" />
                        </a>
                    );
                }

                if (fileType.startsWith("video/")) {
                    return (
                        <div key={url}>
                            <p>Video</p>
                        </div>
                    );
                }

                if (fileType.startsWith("font/")) {
                    return (
                        <div key={url}>
                            <p>Font</p>
                        </div>
                    );
                }

                if (fileType.startsWith("model/")) {
                    return (
                        <div key={url}>
                            <p>Model</p>
                        </div>
                    );
                }

                if (fileType === "text/html" || fileType === "application/json") {
                    return (
                        <div key={url}>
                            <p>Website</p>
                        </div>
                    );
                }

                return (
                    <a key={url} href={url} download className="text-blue-400 underline">
                        Download File
                    </a>
                );
            })}
        </div>
    );
}