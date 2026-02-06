import { Resource, ResourceFile } from "@/types";

export type RendererLayoutConfig = {
	grid: string;
	item: string;
	thumbnail: string;
};

export type RendererType = 
	| "image"
	| "model"
	| "font"
	| "default"

export const rendererConfig: Record<RendererType, RendererLayoutConfig> = {
	image: {
		grid: "grid-cols-12 gap-xl",
		item: "col-span-6",
		thumbnail: "col-span-12 sm:col-span-6 xl:col-span-4",
	},
	font: {
		grid: "grid-cols-12",
		item: "col-span-12",
		thumbnail: "col-span-12",
	},
	model: {
		grid: "grid-cols-12",
		item: "col-span-3",
		thumbnail: "col-span-3",
	},
	default: {
		grid: "grid-cols-12",
		item: "col-span-12",
		thumbnail: "col-span-12",
	}
};

export function getRendererType(resource: Resource): RendererType {
	const file = resource.files[0];

	if (file.fileType.startsWith("image/")) return "image";
	if (file.fileType.startsWith("model/")) return "model";
	if (file.fileType.startsWith("font/")) return "font";

	return "default";
}	