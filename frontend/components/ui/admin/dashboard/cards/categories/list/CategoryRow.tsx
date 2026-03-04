import { ResourceCategory } from "@/types";
import FormattedDate from "@/components/ui/date/FormattedDate";
import ActionsButton from "../../resourceList/ActionsButton";

interface CategoryRowProps {
	category: ResourceCategory;
}

export default function CategoryRow({ category }: CategoryRowProps) {
	return (
		<div className="relative even:bg-surface-hover grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] border-b border-x border-border-strong p-xs">
			<div>
				{category.name}
			</div>
			<div>
				<FormattedDate createdAt={category.createdAt} />
			</div>
			<ActionsButton id={category.id} />
		</div>
	);
};