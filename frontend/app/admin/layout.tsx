"use server";

import DashboardHeader from "@/components/ui/admin/header/Header";
import { ReactNode } from "react";
import SideBar from "@/components/ui/admin/sideBar/SideBar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
			<aside>
				<SideBar />
			</aside>

			<div className="flex-1 flex flex-col">
				<DashboardHeader />
				<main>
					{children}
				</main>
			</div>
        </div>
    );
}