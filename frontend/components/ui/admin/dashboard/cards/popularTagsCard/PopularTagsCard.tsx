import CardWrapper from "../../cardWrapper/CardWrapper";
import ViewMoreButton from "@/components/ui/buttons/ViewMoreButton";
import { ResourceTag } from "@/types";

export type PopularTag = ResourceTag & {
	resourceCount: number;
}

interface PopularTagsCardProps {
	popularTags: PopularTag[];
}

export default function PopularTagsCard({ popularTags }: PopularTagsCardProps) {
	return (
		<CardWrapper colSpan="col-span-6">
			<div className="flex flex-col gap-xl">
				<div className="flex flex-row justify-between">
					<p className="text-text-secondary">
						Popular tags
					</p>
					<ViewMoreButton />
				</div>
				
				<ul className="grid grid-cols-2 md:grid-cols-3 gap-lg">
					{popularTags.map((tag) => (
						<li key={tag.id} className="text-text-secondary">
							{tag.name} <span className="font-semibold text-white">({tag.resourceCount})</span>
						</li>
					))}
				</ul>
			</div>
		</CardWrapper>
	);
};