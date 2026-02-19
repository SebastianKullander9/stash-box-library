import Link from "next/link";
import { ArrowLeftFromLine } from "lucide-react";

export default function ViewSiteButton() {
	return (
		<div>
			<Link
				href="/" 
				className="bg-primary-600 px-md py-xs rounded-lg flex flex-row items-center gap-xs hover:bg-primary-700"
			>
				<ArrowLeftFromLine size={16} color="white" />
				View site
			</Link>
		</div>
	);
};