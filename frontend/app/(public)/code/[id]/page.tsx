import { getOneCode } from "@/actions/code";
import GoBackButton from "@/components/ui/buttons/GoBackButton";
import CodeRenderer from "@/components/fileRenderer/full/renderers/codeRenderer/CodeRenderer";

export default async function ViewCode({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const resource = await getOneCode(id);

	return (
		<section className="mx-auto w-full sm:container section-x-padding sm:px-0">
			<CodeRenderer resource={resource} />
		</section>
	);
};