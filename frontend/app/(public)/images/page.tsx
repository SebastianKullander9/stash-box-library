import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";

export default async function Websites() {
    const category = await getCategoryByName("Websites");
    const resources = await getResourceByCategory(category.id , 20, 0);

    return (
        <div className="main-x-padding">
            <FileRendererThumbnail resources={resources.items} />
        </div>
    )
}