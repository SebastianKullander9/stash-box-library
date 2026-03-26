import Header from "@/components/ui/header/Header";
import HeaderNew from "@/components/ui/header/HeaderNew";
import { ReactNode } from "react";
import { getCategories } from "@/actions/category";
import HomePageSearch from "@/components/ui/search/homePage/HomePageSearch";

export default async function PublicLayout({ children }: { children: ReactNode }) {
    const categories = await getCategories();
	
    return (
        <div className="flex flex-col min-h-screen">
			<div className="grid grid-cols-12 gap-md m-xs">
				<div className="col-span-2">
					<HomePageSearch />
				</div>
				<div className="col-span-10">
					<HeaderNew categories={categories} />
				</div>
			</div>
            
            <main className="h-full flex flex-col flex-1">
				{children}
            </main>
        </div>
    );
}