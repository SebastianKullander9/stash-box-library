import HeaderServer from "@/components/ui/headers/siteHeader/HeaderServer";
import FilterMenu from "@/components/ui/menus/FilterMenu";
import { ReactNode } from "react";
import { getTags } from "@/actions/tag";

export default async function PublicLayout({ children }: { children: ReactNode }) {
    //const tags = await getTags();

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderServer />
            {/*<FilterMenu tags={tags} /> */}
            <main className="flex flex-grow justify-center h-full">
                {children}
            </main>
        </div>
    );
}