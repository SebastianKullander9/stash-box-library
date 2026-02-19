import {
	House,
	File,
	Palette,
	Code,
	SquareMenu,
	Tag,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type SidebarLink = {
	href: string;
	label: string;
	icon: LucideIcon;
}

export type SidebarSection = {
	title: string;
	links: SidebarLink[];
}

export const sidebarSections: SidebarSection[] = [
	{
		title: "Home",
		links: [
			{ href: "/admin", label: "Home", icon: House },
		],
	},
	{
		title: "View all",
		links: [
			{ href: "/admin/resources", label: "Resources", icon: File },
			{ href: "/admin/color-palettes", label: "Color palettes", icon: Palette },
			{ href: "/admin/code", label: "Code", icon: Code },
		],
	},
	{
		title: "Configure",
		links: [
			{ href: "/admin/categories", label: "Categories", icon: SquareMenu },
			{ href: "/admin/tags", label: "Tags", icon: Tag },
		],
	},
];