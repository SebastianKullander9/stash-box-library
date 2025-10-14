/*import { getResourceByCategory } from "@/actions/resource";
import { getCategoryByName } from "@/actions/category";
import FileRendererThumbnail from "@/components/fileRenderer/thumbnail";

export default async function Fonts() {
    const category = await getCategoryByName("Fonts");
    const resources = await getResourceByCategory(category.id , 20, 0);

    console.log(resources.items);
    console.log(resources.totalCount);
    console.log(resources.nextOffset);  

    return (
        <div>
            {resources.items.map((resource, index) => 
                <FileRendererThumbnail key={index} files={resource.files} />
            )}
        </div>
    )
}*/