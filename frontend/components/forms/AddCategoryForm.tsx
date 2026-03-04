import Input from "@/components/ui/inputs/Input";
import BaseButton from "@/components/ui/buttons/BaseButton";
import { createCategoryAction } from "@/actions/category";

export default function AddCategoryForm() {
    return (
        <form action={createCategoryAction}>
			<div className="flex flex-col gap-xs">
				<Input 
					label="Add a category"
					name="categoryName"
					type="text"
					defaultValue=""
				/>
				<div className="">
					<BaseButton 
						label="Add category"
						type="submit"
					/>
				</div>
			</div>
        </form>
    )
}