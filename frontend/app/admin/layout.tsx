import { AdminHeader } from "@/components/ui/headers";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <AdminHeader />
            <main>{children}</main>
        </div>
    );
}