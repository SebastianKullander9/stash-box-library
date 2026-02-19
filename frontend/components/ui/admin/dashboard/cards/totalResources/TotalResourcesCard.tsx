import { ResourcePage } from "@/types";
import CardWrapper from "../../cardWrapper/CardWrapper";
import ViewMoreButton from "@/components/ui/buttons/ViewMoreButton";

interface TotalResourcesProps {
	resources: ResourcePage;
}

export default function TotalResourcesCard({ resources }: TotalResourcesProps) {
	return (
		<CardWrapper colSpan="col-span-3">
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-row justify-between">
					<p className="text-text-secondary">Total resources</p>
					<ViewMoreButton />
				</div>
				<h4>{resources.totalCount}</h4>
			</div>
		</CardWrapper>
	);
};