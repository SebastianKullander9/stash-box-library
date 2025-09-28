import CreateCategory from "@/components/admin/category/AddCategory";
import { createCategoryAction, getCategories, Category } from "@/actions/category";
import ShowCategories from "@/components/admin/category/ShowCategories";

export default async function Categories() {
    const categories: Category[] = await getCategories();
    
    return (
        <div className="flex flex-row w-full h-full justify-around bg-red-500">
            <CreateCategory createCategoryAction={createCategoryAction} />
            <ShowCategories categories={categories} />
        </div>
    )
}