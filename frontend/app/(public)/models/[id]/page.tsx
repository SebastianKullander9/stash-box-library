import { getOneResource } from "@/actions/resource";
import ModelRenderer from "@/components/fileRenderer/full/renderers/ModelRenderer";
import { getRendererType, rendererConfig } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";

export default async function ViewModel({ params }: { params: { id: string } }) {
    const { id } = await params;
    const resource = await getOneResource(id);

	const rendererType = getRendererType(resource);
	const layout = rendererConfig[rendererType];

    return (
        <div className={`grid ${layout.grid} container`}>
            <ModelRenderer resource={resource} colSpan={layout.item} />
        </div>
    )
}