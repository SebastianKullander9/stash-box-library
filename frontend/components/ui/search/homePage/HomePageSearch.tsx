"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { homePageSearch } from "@/actions/search";
import { SearchObject } from "@/types/search";
import { CATEGORY_ICONS } from "@/lib/categoryIcons/iconMap";
import { File, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePageSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchObject[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!showDropdown) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((prev) =>
				prev < results.length - 1 ? prev + 1 : 0
			);
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((prev) =>
				prev > 0 ? prev - 1 : results.length - 1
			);
		}

		if (e.key === "Enter" && activeIndex >= 0) {
			e.preventDefault();
			const selected = results[activeIndex];
			router.push(`/${selected.categoryName.toLowerCase()}/${selected.id}`);
		}

		if (e.key === "Escape") {
			setIsOpen(false);
			setActiveIndex(-1);
		}
	}

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!query) {
            setError("");
            setResults([]);
            setIsLoading(false);
            setIsOpen(false);
            return;
        };

        const id = setTimeout(async () => {
            try {
                setError("");
                const data = await homePageSearch(query);
                setResults(data);
				setActiveIndex(-1)
                setIsOpen(true);
            } catch {
                setResults([]);
                setError("Search failed");
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(id);
    }, [query]);

    const showDropdown = isOpen && (results.length > 0 || (query && !isLoading));

    return (
        <div ref={containerRef} className="relative h-[68px]">
            <div className="absolute h-full pl-md">
                <div className="rounded-full text-text-secondary h-full relative">
                    {isLoading ? (
                        <div className="absolute top-1/2 -translate-y-1/2 animate-spin [animation-duration:3s] text-text-secondary">
                            <Loader />
                        </div>
                    ) : (
						<div className="absolute top-1/2 -translate-y-1/2">
							<Search size={24} />
						</div>
                        
                    )}
                </div>
            </div>
            <input
                className={`
                    bg-surface text-white p-md pl-2xl w-full border-border shadow-xs shadow-border-border outline-none h-[68px]
                    ${showDropdown ? "rounded-t-4xl border" : "rounded-4xl border"}
                `}
                type="text"
                placeholder="Search for resources"
                value={query}
                onFocus={() => results.length > 0 && setIsOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsLoading(true);
                }}
				onKeyDown={handleKeyDown}
				role="combobox"
				aria-expanded={showDropdown}
				aria-controls="search-results"
				aria-activedescendant={
					activeIndex >= 0 ? `result-${activeIndex}` : undefined
				}
            />
            {showDropdown && (
                results.length > 0 ? (
                    <div 
						className="absolute w-full rounded-b-3xl bg-surface border-x border-b border-border overflow-hidden"
						id="search-results"
    					role="listbox"
					>
                        <p className="pl-md text-xs py-xs border-b border-border">
                            Search results
                        </p>
                        {results.map((result, index) => {
                            const categoryName = result.categoryName.toLowerCase();
                            const Icon = CATEGORY_ICONS[categoryName] ?? File;

                            return (
                                <Link
                                    href={`/${categoryName}/${result.id}`}
                                    className={`
										p-md flex flex-row gap-xs hover:bg-surface-hover
										${index === activeIndex ? "bg-surface-hover" : ""}
									`}
                                    key={result.id}
									id={`result-${index}`}
									role="option"
									aria-selected={index === activeIndex}
                                >
                                    <div className="border border-border-strong p-sm rounded-lg">
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p>{result.title}</p>
                                        <p className="text-xs text-text-secondary">
                                            {result.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="absolute w-full rounded-b-3xl bg-surface border-x border-b border-border p-md">
                        <p className="text-xs text-text-secondary">
                            {error || "No search results were found..."}
                        </p>
                    </div>
                )
            )}
        </div>
    );
};