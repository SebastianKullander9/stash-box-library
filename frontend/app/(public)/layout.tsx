import { Header } from "@/components/ui/headers";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}