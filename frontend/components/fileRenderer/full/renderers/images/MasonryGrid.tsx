import { Resource } from "@/types";
import Image from "next/image";

interface MasonryGridProps {
	resource: Resource;
}

export default function MasonryGrid({ resource }: MasonryGridProps) {
	const images = resource.files;

	return (
		<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-xl">
			{images.map((image, index) => (
				<div 
					className="relative mb-4 break-inside-avoid aspect-[3/4]"
					key={image.url + index}
				>
					<Image
						src={image.url}
						alt=""
						fill
						className="object-cover rounded-lg"
					/>
				</div>
			))}
		</div>
	);
};