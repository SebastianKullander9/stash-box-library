import { getOneResource } from "@/actions/resource";
import ImageRenderer from "@/components/fileRenderer/full/renderers/images/ImageRenderer";
import GoBackButton from "@/components/ui/buttons/GoBackButton";
import { rendererConfig } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";
import { getRendererType } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";

export default async function ViewImage({ params }: { params: { id: string } }) {
    const { id } = params;
    const resource = await getOneResource(id);

	const rendererType = getRendererType(resource);
	const layout = rendererConfig[rendererType];

	console.log(layout.grid);
	console.log(layout.item);

    return (
        <div className={`grid ${layout.grid} container`}>
            <ImageRenderer resource={resource} colSpan={layout.item} />
        </div>
    )
}

/*
<GoBackButton label="Go back" href="/images" />
*/