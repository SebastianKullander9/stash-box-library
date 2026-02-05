"use client";

import { ResourceFile } from "@/types";
import { useRef, memo } from "react";
import useApplyFontFace from "@/components/hooks/useApplyFontface";

interface FontRowProps {
	file: ResourceFile;
	previewText: string;
	px: number;
	style?: React.CSSProperties;
	weight?: number;
}

const FontRow = memo(function FontRow({ file, previewText, px, style, weight }: FontRowProps) {
	const ref = useRef<HTMLParagraphElement>(null);
	useApplyFontFace({ ref, file });

	const fontWeight = weight ? weight : file.fontMetadata?.weight || 400;
	const subfamily = file.fontMetadata?.subfamily || "Regular";

	return (
		<div className="flex flex-col gap-xs max-w-[calc(100vw-(var(--spacing-xs)*2))] sm:container overflow-hidden">
			<p className="text-sm text-text-secondary">
				{weight ? "Weight" : subfamily} ({fontWeight})
			</p>
			<p 
				ref={ref}
				style={{ fontSize: `${px}px`, ...style }}
				className="whitespace-nowrap bg-surface px-xl rounded-xl relative"
			>
				{previewText || "The quick brown fox jumps over the lazy dog while the zebra grazes peacefully in the vast meadow under the bright afternoon sun, creating a perfect scene of natural harmony and beauty."}
				<span className="bg-gradient-to-r from-transparent to-background pointer-events-none h-full w-15 absolute right-0" />
			</p>
		</div>
	);
});

FontRow.displayName = "FontRow";
export default FontRow;