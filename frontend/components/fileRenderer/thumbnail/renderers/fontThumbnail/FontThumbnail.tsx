"use client";

import { useEffect, useRef } from "react";
import { Resource } from "@/types";
import FormattedDate from "@/components/ui/date/FormattedDate";
import "./cornerBorders.css";
import Link from "next/link";

type FontThumbnailProps = {
    resource: Resource;
    url: string;
};

export default function FontThumbnail({ resource, url }: FontThumbnailProps) {
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!url) return;
        const element = textRef.current;
        if (!element) return;

        const fontName = resource.title;
        const fontFace = new FontFace(fontName, `url(${url})`);

        fontFace.load().then((loadedFont) => {
            document.fonts.add(loadedFont);

            element.style.fontFamily = `"${fontName}", sans-serif`;
        }).catch((err) => {
            console.error("Error loading font: ", err);
        });
    }, [url, resource]);

    return (
        <div className="flex flex-col gap-xs">
            <div className="flex flex-row items-center gap-xl justify-between">
                <div className="flex flex-row items-center gap-xl">
                    <h3 className="body-large">{resource.title}</h3>
                    <span>-</span>
                    <p className="body-small text-text-secondary">{resource.description}</p>
                </div>
                <div className="body-smallest text-text-secondary">
                    <FormattedDate createdAt={resource.createdAt} />
                </div>
            </div>
            <Link 
                href={`/fonts/${resource.id}`}
                className="cornerBorders p-xl !bg-surface"
            >
                <p
                    ref={textRef}
                    className="heading-3 !font-normal"
                >
                    The quick brown fox jumps over the lazy dog.
                </p>
            </Link>
        </div>
        
    )
}