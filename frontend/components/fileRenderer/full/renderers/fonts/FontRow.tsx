"use client";

import { Resource } from "@/types";
import { ResourceFile } from "@/types";
import { useEffect, useRef } from "react";

interface FontRowProps {
	resource: Resource;
	file: ResourceFile;
}

export default function FontRow({ resource, file}: FontRowProps) {
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (!file?.fontMetadata?.family) return;
		const element = textRef.current;
		if (!element) return;

		const fontName = file.fontMetadata?.family;
		const weight = file.fontMetadata?.weight || 400;
		const style = file.fontMetadata?.subfamily?.toLowerCase().includes('italic') ? 'italic' : 'normal';

		const fontFace = new FontFace(
			fontName, 
			`url(${file.url})`,
			{
				weight: weight.toString(),
				style: style
			}
		);

		fontFace.load().then((loadedFont) => {
			document.fonts.add(loadedFont);
			element.style.fontFamily = `"${fontName}", sans-serif`;
			element.style.fontWeight = weight.toString();
			element.style.fontStyle = style;
		}).catch((err) => {
			console.error("Error loading font: ", err);
		});
	}, [file, resource]);

	const fontName = file.fontMetadata?.family || "Unknown";
	const weight = file.fontMetadata?.weight || 400;
	const subfamily = file.fontMetadata?.subfamily || "Regular";

	return (
		<div>
			<p className="text-sm text-gray-600">
				{fontName} - {subfamily} (Weight: {weight})
			</p>
			<p ref={textRef} className="heading-3">
				The quick brown fox jumps over the lazy dog.
			</p>
		</div>
	);
};