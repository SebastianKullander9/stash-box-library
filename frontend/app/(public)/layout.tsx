import Header from "@/components/ui/header";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}