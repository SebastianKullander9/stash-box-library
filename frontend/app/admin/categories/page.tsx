import CreateCategory from "@/components/admin/category/AddCategory";
import { createCategoryAction, getCategories, Category } from "@/actions/category";
import ShowCategories from "@/components/admin/category/ShowCategories";

export default async function Categories() {
    const categories: Category[] = await getCategories();
    
    return (
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-6 p-8 gap-8 justify-center">
                <div className="col-span-2">
                    <CreateCategory createCategoryAction={createCategoryAction} />
                </div>
                <div className="col-span-4">
                    <ShowCategories categories={categories} />
                </div>
            </div>
        </div>

    )
}