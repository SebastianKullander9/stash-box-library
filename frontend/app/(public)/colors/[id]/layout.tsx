import { ReactNode } from "react";
import Tabs from "@/components/ui/colorPalette/Tabs";

export default function PaletteLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
	return (
		<section className="grid grid-cols-12 container section-x-padding md:p-0">
			<Tabs id={params.id} />
			{children}
		</section>
	);
}