import Link from "next/link";
import { getCategories } from "@/actions/category";
import HamburgerMenu from "./HamburgerMenu";

export default async function Header() {
    const categories = await getCategories();

    return (
        <header className="flex flex-row main-x-padding justify-between text-normal text-white h-12 items-center">
            <div>
                <h1 className="text-sm mb-0">StashBox</h1>
            </div>
            <nav aria-label="Main navigation">
                <ul className="hidden sm:flex  flex-row main-gap font-weight">
                    {categories.map((category, index) => (
                        <li key={index}><Link href="">{category.name}</Link></li>
                    ))}
                </ul>
                <div className="sm:hidden">
                    <HamburgerMenu categories={categories} />
                </div>
            </nav>
        </header>
    );
}