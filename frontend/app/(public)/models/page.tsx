import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import Renderer from "@/components/fileRenderer/thumbnail/";
import { getRendererType, rendererConfig } from "@/components/fileRenderer/thumbnail/rendererLayoutConfig";

export default async function Models() {
    const category = await getCategoryByName("Models");
    const resources = await getResourceByCategory(category.id , 20, 0);

	const rendererType = getRendererType(resources.items[0]);
	const layout = rendererConfig[rendererType];

    return (
        <div className={`w-screen container section-x-padding md:px-0 grid ${layout.grid} gap-xl`}>
            <Renderer resources={resources.items} colSpan={layout.thumbnail} />
        </div>
    )
}