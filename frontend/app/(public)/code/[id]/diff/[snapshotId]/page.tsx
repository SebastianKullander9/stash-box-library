import { getCachedCode } from "@/lib/cache/code";
import DiffRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/diff/DiffRenderer";

export default async function DiffPage({ params }: { params: Promise<{ id: string, snapshotId: string }>}) {
	const { id, snapshotId } = await params;
	const resource = await getCachedCode(id);

	return (
		<DiffRenderer resource={resource} snapshotId={snapshotId} />
	);
};