import CardWrapper from "../../cardWrapper/CardWrapper";
import AddCategoryForm from "@/components/forms/AddCategoryForm";

export default function AddCategory() {
	return (
		<CardWrapper colSpan="col-span-2 self-start">
			<AddCategoryForm />
		</CardWrapper>
	);
};