import EditCodeRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/EditCodeRenderer";
import { getCachedCode } from "@/lib/cache/code";

export default async function CodeEdit({ params }: { params: { id: string } }) {
	const resource = await getCachedCode(params.id);

	return (
		<EditCodeRenderer resource={resource} />
	);
};