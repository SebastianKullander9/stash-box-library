import Image from "next/image";
import OpenIcon from "../../../public/svgs/square-arrow-out-up-right.svg";
import { Resource } from "@/types";

type OpenResourceButtonProps = {
    category: string;
    resource: Resource;
}

export default function OpenResourceButton({ category, resource }: OpenResourceButtonProps) {
    return (
        <a href={`/${category}/${resource.id}`} className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
            <Image width={20} height={20} src={OpenIcon} alt={`open ${resource.title}`} className="brightness-0 invert" />
        </a>
    )
}