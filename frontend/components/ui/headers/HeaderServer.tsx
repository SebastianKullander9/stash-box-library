
import Link from "next/link";
import { getCategories } from "@/actions/category";
import HamburgerMenu from "./HamburgerMenu";
import HeaderClient from "./HeaderClient";

export default async function HeaderServer() {
    const categories = await getCategories();

    return (
        <HeaderClient categories={categories} />
    );
}

/* 

*/

/*
    <HamburgerMenu categories={categories} />
*/