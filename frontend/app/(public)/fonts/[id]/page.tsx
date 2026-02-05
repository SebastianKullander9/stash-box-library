import { getOneResource } from "@/actions/resource";
import FontRenderer from "@/components/fileRenderer/full/renderers/fonts/FontRenderer";
import GoBackButton from "@/components/ui/buttons/GoBackButton";

export default async function ViewFont({ params }: { params: { id: string } }) {
	const { id } = params;
	const resource = await getOneResource(id);

	return (
		<section className="mx-auto w-full sm:container section-x-padding sm:px-0">
			<FontRenderer resource={resource} />
		</section>
	);
};