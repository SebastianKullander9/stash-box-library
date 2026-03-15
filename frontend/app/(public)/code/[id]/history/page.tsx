import { getCachedCode } from "@/lib/cache/code";
import HistoryRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/HistoryRenderer";

export default async function CodeHistory({ params }: { params: { id: string } }) {
	const resource = await getCachedCode(params.id);

	return (
		<HistoryRenderer resource={resource} />
	);
};