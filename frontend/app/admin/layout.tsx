import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="w-screen h-screen">
            <main>{children}</main>
        </div>
    );
}