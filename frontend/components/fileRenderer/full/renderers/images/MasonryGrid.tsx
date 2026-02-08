"use client";

import { useState } from "react";
import { Resource } from "@/types";
import { ResourceFile } from "@/types";
import Image from "next/image";
import ShowImageFull from "./ShowImageFull";

interface MasonryGridProps {
	resource: Resource;
}

export default function MasonryGrid({ resource }: MasonryGridProps) {
	const [imgFile, setImgFile] = useState<ResourceFile | null>(null);
	const images = resource.files;
	console.log(images)

	return (
		<>
			<div className="columns-1 sm:columns-1 md:columns-2 lg:columns-2 gap-xl">
				{images.map((image, index) => (
					<div
						key={image.url + index}
						className="mb-xl break-inside-avoid"
					>
						<div 
							className="relative cursor-pointer"
							onClick={() => setImgFile(image)}
						>
							<Image
								src={image.url}
								alt=""
								width={image.imageMetadata?.width}
								height={image.imageMetadata?.height}
								quality={95}
								unoptimized
								className="w-full h-auto rounded-lg"
								sizes="(max-width: 640px) 100vw,
									(max-width: 768px) 50vw,
									(max-width: 1024px) 33vw,
									25vw"
							/>
						</div>
					</div>
				))}
			</div>

			<ShowImageFull 
				imgFile={imgFile}
				setImgFile={setImgFile}
			/>
		</>
	);
};