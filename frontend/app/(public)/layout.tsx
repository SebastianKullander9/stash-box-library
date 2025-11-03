import HeaderServer from "@/components/ui/headers/HeaderServer";
import FilterMenu from "@/components/ui/menus/FilterMenu";
import { ReactNode } from "react";
import { getTags } from "@/actions/tag";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const tags = await getTags();

    return (
        <div>
            <HeaderServer />
            <FilterMenu tags={tags} />
            <main>{children}</main>
        </div>
    );
}