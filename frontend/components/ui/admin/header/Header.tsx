"use client";

import Search from "../../inputs/Search";
import BaseButton from "../../buttons/BaseButton";
import Link from "next/link";
import useCurrentPage from "@/components/hooks/useCurrentPage";

export default function DashboardHeader() {
	const currentPage = useCurrentPage();

	return (
		<header 
			className="sticky top-0 h-16 flex flex-row justify-between items-center section-x-padding border-b-1 border-border z-[101]"
		>
			<div>
				{currentPage}
			</div>
			<div className="flex flex-row gap-xl">
				<Search />
				<Link href="/admin/add-resource">
					<BaseButton label="Add resource" />
				</Link>
				<Link href="/admin/add-color-palette">
					<BaseButton label="Add palette" />
				</Link>
				<Link href="/admin/add-code">
					<BaseButton label="Add code" />
				</Link>
			</div>
		</header>
	)
}