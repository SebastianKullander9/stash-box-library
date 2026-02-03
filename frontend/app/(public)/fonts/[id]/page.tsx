import { getOneResource } from "@/actions/resource";
import FontRenderer from "@/components/fileRenderer/full/renderers/fonts/FontRenderer";
import GoBackButton from "@/components/ui/buttons/GoBackButton";

export default async function ViewFont({ params }: { params: { id: string } }) {
	const { id } = params;
	const resource = await getOneResource(id);

	console.log(resource);

	return (
		<section>
			<FontRenderer resource={resource} />
		</section>
	);
};