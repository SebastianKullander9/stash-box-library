import Input from "@/components/ui/inputs/Input";
import BaseButton from "@/components/ui/buttons/BaseButton";
import { createCategoryAction } from "@/actions/category";

export default function AddCategoryForm() {
    return (
        <form action={createCategoryAction} className="border-t-1 border-[var(--color-white)] mt-6">
            <fieldset>
                <legend className="text-white text-normal text-sm py-4">Add a category</legend>
                <Input label="Category" name="categoryName" type="text" />
                <BaseButton label="Add" type="submit" />
            </fieldset>
        </form>
    )
}