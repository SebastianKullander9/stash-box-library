import Header from "@/components/ui/header/Header";
import HeaderNew from "@/components/ui/header/HeaderNew";
import { ReactNode } from "react";
import { getCategories } from "@/actions/category";
import Search from "@/components/ui/inputs/Search";

export default async function PublicLayout({ children }: { children: ReactNode }) {
    const categories = await getCategories();
	
    return (
        <div className="flex flex-col min-h-screen">
			<div className="flex flex-row">
				<Search />
				<HeaderNew categories={categories} />
			</div>
            
            <main className="flex h-full">
                {children}
            </main>
        </div>
    );
}