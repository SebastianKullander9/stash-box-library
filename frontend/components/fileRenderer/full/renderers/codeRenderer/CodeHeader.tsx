"use client";

import { History } from "lucide-react";
import { File } from "lucide-react";
import { Code } from "@/types/code";
import FormattedDate from "@/components/ui/date/FormattedDate";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CodeHeaderProps {
	resource: Code; 
}

export default function CodeHeader({ resource }: CodeHeaderProps) {
	const pathname = usePathname();
	const baseHref = `/code/${resource.id}`;
	const isHistory = pathname.endsWith("/history");
	const Icon = isHistory ? File : History;
	const linkLabel = isHistory ? "View code" : "History";
	const href = isHistory ? baseHref : `${baseHref}/history`;

	return (
		<div className="col-span-12 bg-surface rounded-lg px-4 py-2 flex flex-row items-center justify-between">
			<div className="flex flex-row gap-md items-center">
				<p>
					{resource.title}
				</p>
				<p className="text-xs text-text-secondary">
					{resource.description}
				</p>
			</div>
			<div className="flex flex-row items-center gap-md">
				<div className="text-xs text-text-tertiary ">
					<FormattedDate createdAt={resource.createdAt} />
				</div>
				<Link 
					href={href}
					className="flex flex-row gap-1 items-center hover:bg-surface-hover p-2 rounded-lg"
				>
					<Icon size={22} />
					{linkLabel}
				</Link>
			</div>
		</div>
	);
};