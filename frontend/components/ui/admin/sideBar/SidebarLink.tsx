import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
	href: string;
	label: string;
	icon: LucideIcon;
}

const ICON_SIZE = 16;
const ICON_COLOR = "#a3a3a3";

export default function SidebarLink({ href, label, icon: Icon }: NavLinkProps) {
	return (
		<li className="flex flex-row gap-xs items-center">
			<Icon size={ICON_SIZE} color={ICON_COLOR} />
			<Link 
				href={href}
				className="hover:text-text-secondary transition-colors duration-100"
			>
				{label}
			</Link>
		</li>
	);
};