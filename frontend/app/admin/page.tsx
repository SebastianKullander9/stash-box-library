import Dashboard from "@/components/adminDashboard/home/Dashboard";
import { getResources } from "@/actions/resource";
import { getCategories } from "@/actions/category";
import { getPopularTags } from "@/actions/tag";
import ToastNotification from "@/components/ui/admin/toast/ToastNotification";

export default async function Admin({ 
	searchParams 
}:{ 
	searchParams: Promise<{ status?: "success" | "error" }>
}) {
    const resources = await getResources(20, 0);
	const categories = await getCategories();
	const popularTags = await getPopularTags();

	const { status } = await searchParams;

    return (
		<>
			{status && (
				<ToastNotification status={status} />
			)}

			<section>
				<Dashboard 
					resources={resources} 
					categories={categories} 
					popularTags={popularTags}
				/>
			</section>
		</>
    );
}