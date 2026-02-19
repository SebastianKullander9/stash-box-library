import CardWrapper from "../../cardWrapper/CardWrapper";
import { ResourceCategory } from "@/types";
import EditButton from "@/components/ui/buttons/EditButton";

interface CategoriesCardProps {
	categories: ResourceCategory[];
}

export default function CategoriesCard({ categories }: CategoriesCardProps) {
	return (
		<CardWrapper colSpan="col-span-3">
			<div className="flex flex-col gap-xl">
				<div className="flex flex-row justify-between">
					<p className="text-text-secondary">Current categories</p>
					<EditButton />
				</div>
				
				<ul className="grid grid-cols-2 md:grid-cols-3 gap-xs">
					{categories.map((category) => (
						<li 
							key={category.id}
							className="text-sm font-medium truncate"
						>
							{category.name}
						</li>
					))}
				</ul>
				
				<p className="text-sm text-text-secondary">
					{categories.length} categories
				</p>
			</div>	
		</CardWrapper>
	);
}