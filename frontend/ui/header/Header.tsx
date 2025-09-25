import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
    return (
        <nav className="h-16 w-full bg-black text-white px-8 flex items-center justify-between">
            <div>
                <h1 className="text-xl font-bold">StashBox</h1>
            </div>
            <div className="h-full hidden sm:block">
                <DesktopMenu />
            </div>
            <div className="block sm:hidden">
                <MobileMenu />
            </div>
        </nav>
    );
}