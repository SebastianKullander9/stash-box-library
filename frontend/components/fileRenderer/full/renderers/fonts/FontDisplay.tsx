"use client";

import { Resource } from "@/types";
import useApplyFontFace from "@/components/hooks/useApplyFontface";
import { useRef } from "react";

interface FontDisplayProps {
	resource: Resource;
}

export default function FontDisplay({ resource }: FontDisplayProps) {
	const ref = useRef<HTMLParagraphElement>(null);
	const files = resource.files;
	const displayFontFile = files.find((f) => f.fontMetadata?.isThumbnailFace);

	useApplyFontFace({ ref, file: displayFontFile })

	return (
		<h1 ref={ref} className="text-center">
			Almost before we knew it, we had left the ground.
		</h1>
	);
};