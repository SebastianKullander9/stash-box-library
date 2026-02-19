import Header from "@/components/ui/header/Header";
import { ReactNode } from "react";
import { getCategories } from "@/actions/category";

export default async function PublicLayout({ children }: { children: ReactNode }) {
    const categories = await getCategories();
	
    return (
        <div className="flex flex-col min-h-screen">
            <Header categories={categories} />
            <main className="flex h-full">
                {children}
            </main>
        </div>
    );
}