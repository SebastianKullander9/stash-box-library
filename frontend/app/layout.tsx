import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";

export const metadata: Metadata = {
    title: "Stashbox",
    description: "A personal library for storing inspiration regarding frontend",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
				<Header />
                {children}
            </body>
        </html>
    );
}
