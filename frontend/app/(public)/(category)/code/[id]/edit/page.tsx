import EditCodeRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/EditCodeRenderer";
import { getCachedCode } from "@/lib/cache/code";

export default async function CodeEdit({ 
	params 
}: { 
	params: Promise<{ id: string }> 
}) {
	const { id } = await params;
	const resource = await getCachedCode(id);

	return (
		<EditCodeRenderer resource={resource} />
	);
};