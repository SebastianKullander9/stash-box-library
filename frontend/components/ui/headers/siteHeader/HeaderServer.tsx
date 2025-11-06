
import { getCategories } from "@/actions/category";
import HeaderClient from "./HeaderClient";

export default async function HeaderServer() {
    const categories = await getCategories();

    return (
        <HeaderClient categories={categories} />
    );
}