import { ResourceCategory } from "@/types";

interface ResourcesPerCategoryProps {
	categoriesWithCount: ResourceCategory[];
}

export default function ResourcesPerCategory({ categoriesWithCount }: ResourcesPerCategoryProps) {
	console.log(categoriesWithCount)

	return (
		<div>
			
		</div>
	);
};