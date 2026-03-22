import { getCachedCode } from "@/lib/cache/code";
import CodeRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/CodeRenderer";

export default async function ViewCode({ 
	params 
}: { 
	params: Promise<{ id: string }> 
}) {
	const { id } = await params;
	const resource = await getCachedCode(id);

	return (
		<CodeRenderer resource={resource} />
	);
};