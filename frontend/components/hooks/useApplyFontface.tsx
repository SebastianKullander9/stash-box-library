import { useEffect } from "react";
import { ResourceFile } from "@/types";

interface UseApplyFontFaceProps {
    ref: React.RefObject<HTMLParagraphElement | null> | null;
    file: ResourceFile | undefined;
}

const loadedFonts = new Set<string>();

export default function useApplyFontFace({ ref, file }: UseApplyFontFaceProps) {
    useEffect(() => {
        const family = file?.fontMetadata?.family;
        if (!family) return;

        const element = ref?.current;
        if (!element) return;

        const weight = file.fontMetadata?.weight || 400;
        const style = file.fontMetadata?.subfamily?.toLowerCase().includes("italic")
			? "italic"
			: "normal";

        const fontKey = `${family}-${weight}-${style}`;

        if (!loadedFonts.has(fontKey)) {
            const fontFace = new FontFace(
                family,
                `url(${file.url})`,
                { weight: weight.toString(), style }
            );

            fontFace
                .load()
                .then((loadedFont) => {
                    document.fonts.add(loadedFont);
                    loadedFonts.add(fontKey);

                    element.style.fontFamily = `"${family}", sans-serif`;
                    element.style.fontWeight = weight.toString();
                    element.style.fontStyle = style;
                })
                .catch(console.error);
        } else {
            element.style.fontFamily = `"${family}", sans-serif`;
            element.style.fontWeight = weight.toString();
            element.style.fontStyle = style;
        }
    }, [ref, file?.url, file?.fontMetadata?.family, file?.fontMetadata?.weight, file?.fontMetadata?.subfamily,
    ]);
}