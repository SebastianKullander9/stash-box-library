"use server";

import DashboardHeader from "@/components/ui/headers/dashboardHeader/DashboardHeader";
import { ReactNode } from "react";
import AddResourceForm from "@/components/forms/AddResourceForm";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <DashboardHeader>
                <AddResourceForm />
            </DashboardHeader>
            <main>
                {children}
            </main>
        </div>
    );
}