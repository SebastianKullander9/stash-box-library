"use client";

import { useState } from "react";
import FilterButton from "../buttons/FilterButton";
import FilterSidebar from "./FilterSidebar";
import { ResourceTag } from "@/types";

type FilterMenuProps = {
    tags: ResourceTag[];
}

export default function FilterMenu({ tags }: FilterMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return(
        <>
            <div onClick={toggle} className="h-12 main-x-padding">
                <FilterButton state={isOpen} toggle={toggle} />
            </div>

            <FilterSidebar state={isOpen} toggle={toggle} tags={tags} />
        </>

    )
}