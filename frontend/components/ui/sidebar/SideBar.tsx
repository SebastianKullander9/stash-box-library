"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ResourceTag } from "@/types";
import { 
	ListFilter, 
	X,
	Square,
	SquareCheckBig,
	CalendarArrowDown,
	CalendarArrowUp,
} from "lucide-react";
import { useCallback } from "react";


interface SideBarProps {
	tags: ResourceTag[];
}

export default function SideBar({ tags }: SideBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const activeTags = searchParams.getAll("tag");
	const isVariable = searchParams.get("variable") === "true";
	const ascOrder = searchParams.get("asc") === "true";
	const OrderIcon = ascOrder ? CalendarArrowDown : CalendarArrowUp;

	const toggleTag = useCallback((tagName: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (activeTags.includes(tagName)) {
			params.delete("tag");
			activeTags.filter((tag) => tag !== tagName).forEach((tag) => params.append("tag", tag));
		} else {
			params.append("tag", tagName);
		}

		params.delete("page");
		router.replace(`?${params.toString()}`);
	}, [searchParams, activeTags, router]);

	const toggleVariable = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (params.get("variable") === "true") {
			params.delete("variable");
		} else {
			params.set("variable", "true");
		}

		params.delete("page");
		router.replace(`?${params.toString()}`);
	}, [router, searchParams]);

	const toggleOrder = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (params.get("asc") === "true") {
			params.delete("asc");
		} else {
			params.set("asc", "true");
		}

		params.delete("page");
		router.replace(`?${params.toString()}`);
	}, [router, searchParams]);

	const clearFilters = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());
    	params.delete("tag");
		params.delete("variable");
		router.replace(`?${params.toString()}`);
	}, [router, searchParams]);

	return (
		<div className="bg-surface rounded-lg h-full p-md gap-md flex flex-col">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-1 items-center text-text-secondary">
					<ListFilter size={18} />
					<p>
						Filters
					</p>
				</div>
				<button 
					className={`
						flex flex-row gap-1 items-center px-md py-xs rounded-lg border border-border
						${(activeTags.length > 0) || isVariable ? "bg-surface-active cursor-pointer hover:border-border-strong" : "text-text-secondary"}
					`}
					onClick={clearFilters}
				>
					<p>
						Clear
					</p>
					<X size={22} />
				</button>
			</div>
			<div>
				<div
					className="inline-flex flex-row items-center gap-1 p-xs text-text-secondary hover:bg-surface-hover cursor-pointer rounded-lg"
					onClick={toggleOrder}
				>
					<OrderIcon size={20} />
					
					<p>
						{ascOrder ? "DESC" : "ASC"}
					</p>
				</div>
			</div>
			<div>
				<div
					onClick={toggleVariable}
					className={`
						inline-flex flex-row gap-1 p-xs rounded-lg items-center cursor-pointer border
						${isVariable ? "bg-surface-active border-border-strong" : "text-text-secondary hover:bg-surface-hover border-surface" }
					`}
				>
					{isVariable ? (
						<SquareCheckBig size={20} />
					) : (
						<Square size={20} />
					)}
					<p>
						isVariableFont
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-sm">
				{tags.map((tag) => (
					<div
						className={`
							text-text-secondary text-center p-xs text-xs rounded-lg 
							cursor-pointer hover:border-border-strong border 
							${activeTags.includes(tag.name) ? "bg-surface-active text-white border-border-strong" : "bg-surface-hover border-surface hover:bg-surface-hover"}
						`}
						key={tag.id}
						onClick={() => toggleTag(tag.name)}
					>
						{tag.name}
					</div>
				))}
			</div>
		</div>
	);
};