import CardWrapper from "../../cardWrapper/CardWrapper";
import { ResourceTag } from "@/types";

export type PopularTag = ResourceTag & {
	resourceCount: number;
}

interface PopularTagsCardProps {
	popularTags: PopularTag[];
}

export default function PopularTagsCard({ popularTags }: PopularTagsCardProps) {
	return (
		<CardWrapper colSpan="col-span-4">
			<div>
				<p className="text-text-secondary">
					Popular tags
				</p>
				<ul>
					{popularTags.map((tag) => (
						<li key={tag.id}>
							{tag.name} ({tag.resourceCount})
						</li>
					))}
				</ul>
			</div>
		</CardWrapper>
	);
};