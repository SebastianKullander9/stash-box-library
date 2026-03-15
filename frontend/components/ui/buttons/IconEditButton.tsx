import { SquarePen } from "lucide-react";

export default function IconEditButton() {
	return (
		<div 
			className="relative flex flex-row items-center p-xs rounded-tl-lg rounded-bl-lg border border-border hover:bg-surface-hover cursor-pointer"
		>
			<div
				className={`transition-transform duration-150 cursor-pointer`}
			>
				<SquarePen size={22} />
			</div>
		</div>
	);
};