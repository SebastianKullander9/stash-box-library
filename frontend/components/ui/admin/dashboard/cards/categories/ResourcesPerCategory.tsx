import { ResourceCategory } from "@/types";
import CardWrapper from "../../cardWrapper/CardWrapper";

interface ResourcesPerCategoryProps {
	categoriesWithCount: ResourceCategory[];
}

export default function ResourcesPerCategory({ categoriesWithCount }: ResourcesPerCategoryProps) {
	console.log(categoriesWithCount)

	return (
		<CardWrapper colSpan="">
			<div className="flex flex-col gap-md">
				<p>
					Resources per category
				</p>
				<div className="flex flex-col gap-xs">
					{categoriesWithCount.map((category) => (
						<div
							className="flex flex-row justify-between border-b border-border-strong"
							key={category.id}
						>
							<p className="text-text-secondary">
								{category.name}:
							</p>
							<p>
								{category.resourceCount}
							</p>
						</div>
					))}
				</div>
			</div>
		</CardWrapper>
	);
};