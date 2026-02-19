"use client";

import { usePathname } from "next/navigation";
import { sidebarSections } from "../ui/admin/config/navigation.config";
import { SidebarLink } from "../ui/admin/config/navigation.config";

export default function useCurrentPage(): string {
    const pathname = usePathname();

    const allLinks: (SidebarLink & { section: string })[] = sidebarSections.flatMap((section) =>
        section.links.map((link) => ({ ...link, section: section.title }))
    );

    const current = allLinks.find((link) => link.href === pathname);

    return current ? current.label : "Dashboard";
}