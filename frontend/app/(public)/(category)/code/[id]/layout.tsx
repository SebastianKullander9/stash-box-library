import { ReactNode } from "react";
import CodeHeader from "@/components/fileRenderer/full/renderers/codeRenderer/CodeHeader";
import { getCachedCode } from "@/lib/cache/code";

export default async function CodeLayout({ 
	children, 
	params 
}: { 
	children: ReactNode, 
	params: Promise<{ id: string }>
}) {
	const { id } = await params;
	const resource = await getCachedCode(id);

	return (
		<section className="grid grid-cols-12 gap-md w-full sm:container mx-auto">
			<CodeHeader resource={resource} />
			{children}
		</section>
	)
}