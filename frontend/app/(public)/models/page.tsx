import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";

export default async function Models() {
    const category = await getCategoryByName("Models");
    const resources = await getResourceByCategory(category.id , 20, 0);

    console.log(resources)

    return (
        <div className="w-screen section-x-padding grid grid-cols-12 gap-xl">
            <FileRendererThumbnail resources={resources.items} />
        </div>
    )
}