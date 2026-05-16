import { ReactNode } from "react";
import SideBar from "@/components/ui/sidebar/SideBar";
import { Suspense } from "react";

export default async function CategoryLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 grid grid-cols-12">
            <div className="col-span-2 h-calc(100vh-40px)">
                <Suspense fallback={<div>Loading filters...</div>}>
                    <SideBar />
                </Suspense>
            </div>
            <main className="col-span-10">{children}</main>
        </div>
    );
}
