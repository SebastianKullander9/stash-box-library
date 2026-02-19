import AddResourceForm from "@/components/forms/AddResourceForm";
import CardWrapper from "@/components/ui/admin/dashboard/cardWrapper/CardWrapper";

export default function AddResource() {
	return (
		<section className="p-2xl flex justify-center">
			<CardWrapper colSpan="col-span-12">
				<AddResourceForm />
			</CardWrapper>
		</section>
	);
};