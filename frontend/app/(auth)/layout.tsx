import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {

	return (
		<div className="flex flex-col min-h-[100dvh]">
			<main className="flex flex-grow justify-center h-full">
				{children}
			</main>
		</div>
	);
}