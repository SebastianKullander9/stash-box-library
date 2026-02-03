import { MdViewInAr } from "react-icons/md";
import { Resource } from "@/types";
import Link from "next/link";

type OpenResourceButtonProps = {
    category: string;
    resource: Resource;
}

export default function OpenResourceButton({ category, resource }: OpenResourceButtonProps) {
    return (
		<Link href={`/${category}/${resource.id}`}>
			<button className="p-xs border border-text-secondary flex flex-row items-center gap-sm rounded-md cursor-pointer hover:bg-gray-800">
				<p>View model</p>
				<MdViewInAr size={26} color="#a3a3a3" />
			</button>
		</Link>
    )
}