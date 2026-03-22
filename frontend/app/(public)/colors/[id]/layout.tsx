import { ReactNode } from "react";
import Tabs from "@/components/ui/colorPalette/Tabs";

export default async function PaletteLayout({ 
	children, 
	params 
}: { 
	children: ReactNode, 
	params: Promise<{ id: string }>
}) {
	const { id } = await params;

	return (
		<section className="grid grid-cols-12 container section-x-padding md:p-0">
			<Tabs id={id} />
			{children}
		</section>
	);
}