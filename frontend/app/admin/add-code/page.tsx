import AddCodeForm from "@/components/forms/AddCodeForm";
import CardWrapper from "@/components/ui/admin/dashboard/cardWrapper/CardWrapper";

export default function AddCode() {
	return (
		<section className="p-2xl flex justify-center">
			<CardWrapper colSpan="col-span-12">
				<AddCodeForm />
			</CardWrapper>
		</section>
	);
};