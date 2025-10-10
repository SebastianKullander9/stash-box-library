import { deleteCategory, updateCategory, getCategories, Category } from "@/actions/category";
import BaseButton from "@/components/ui/buttons/BaseButton";
import Input from "@/components/ui/inputs/Input";

export default async function CategoriesList() {
    const categories: Category[] = await getCategories();

    return (
        <div>
            <h2 className="text-white text-normal text-sm mb-4">Categories</h2>
            <ul className="flex flex-col main-gap text-black">
                {categories.length === 0 && <li className="text-white text-normal">No categories added yet...</li>}
                {categories.map((category) => (
                    <li key={category.id} className="flex flex-row justify-between items-center">
                        <form action={updateCategory} className="flex flex-row main-gap">
                            <input type="hidden" name="id" value={category.id} />
                            <div className="max-w-40">
                                <Input name="category" type="text" defaultValue={category.name} />
                            </div>
                            <div>
                                <BaseButton label="Update" background={true} type="submit" />
                            </div>
                        </form>
                        <form action={deleteCategory}>
                            <input type="hidden" name="id" value={category.id} />
                            <BaseButton label="Delete" background={false} type="submit" />
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    )
}