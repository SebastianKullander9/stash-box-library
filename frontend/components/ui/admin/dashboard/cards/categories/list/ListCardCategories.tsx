import CardWrapper from "../../../cardWrapper/CardWrapper";
import { ResourceCategory } from "@/types";
import CategoryRow from "./CategoryRow";

interface ListCardCategoriesProps {
	categories: ResourceCategory[];
}

export default function ListCardCategories({ categories }: ListCardCategoriesProps ) {
	return (
		<CardWrapper colSpan="">
			<div>
				All categories
			</div>
			<div>
				<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0] border-1 border-border-strong p-xs rounded-tr-lg rounded-tl-lg">
					<p>Category</p>
					<p>Created</p>
				</div>
				<div>
					{categories.map((category) => (
						<CategoryRow 
							key={category.id}
							category={category}
						/>
					))}
				</div>
			</div>
		</CardWrapper>
	);
};