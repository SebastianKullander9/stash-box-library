import { Resource } from "@/types";
import FontRow from "./FontRow";

interface FontRendererProps {
	resource: Resource;
}

export default function FontRenderer({ resource }: FontRendererProps) {
	const files = resource.files;

	return (
		<section className="grid grid-span-12">
			{files.map((file) => (
				<FontRow key={file.url} resource={resource} file={file} />
			))}
		</section>
	);
};