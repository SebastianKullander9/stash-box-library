import Link from "next/link";

export default function Header() {
    return (
        <header className="flex flex-row main-x-padding justify-between text-normal h-12 items-center">
            <div>
                <h6>StashBox</h6>
            </div>
            <nav aria-label="Main navigation">
                <ul className="flex flex-row main-gap font-weight">
                    <li><Link href="/">Fonts</Link></li>
                    <li><Link href="/">Websites</Link></li>
                    <li><Link href="/">Images</Link></li>
                    <li><Link href="/">Code</Link></li>
                    <li><Link href="/">Models</Link></li>
                </ul>
            </nav>
        </header>
    );
}