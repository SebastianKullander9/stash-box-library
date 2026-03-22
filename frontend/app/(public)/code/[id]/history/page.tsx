import { getCachedCode } from "@/lib/cache/code";
import HistoryRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/history/HistoryRenderer";

export default async function CodeHistory({ 
	params 
}: { 
	params: Promise<{ id: string }> 
}) {
	const { id } = await params;
	const resource = await getCachedCode(id);

	console.log(resource)

	return (
		<HistoryRenderer resource={resource} />
	);
};