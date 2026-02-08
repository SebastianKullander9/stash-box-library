"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ResourceFile } from "@/types";

interface ShowImageFullProps {
	imgFile: ResourceFile | null;
	setImgFile: React.Dispatch<React.SetStateAction<ResourceFile | null>>;
}

export default function ShowImageFull({ imgFile, setImgFile }: ShowImageFullProps) {
	const closeImage = () => {
		setImgFile(null);
	}

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setImgFile(null);
		};

		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [setImgFile]);

	if (!imgFile) return null;

	return (
		<div 
			className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-[9999] p-4"
			onClick={closeImage}
		>
			<div 
				className="relative max-w-[90vw] max-h-[90vh]"
				onClick={(e) => e.stopPropagation()}
			>
				<Image 
					src={imgFile.url}
					alt=""
					width={imgFile.imageMetadata?.width}
					height={imgFile.imageMetadata?.height}
					quality={95}
					unoptimized
					className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
				/>
			</div>
		</div>
	);
}