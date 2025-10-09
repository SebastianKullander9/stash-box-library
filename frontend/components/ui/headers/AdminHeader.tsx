import LogoutButton from "../buttons/LogoutButton";

export default function Header() {
    return (
        <header className="flex flex-row main-x-padding justify-between text-normal text-white h-12 items-center">
            <div>
                <h6 className="text-sm mb-0">Admin Dashboard</h6>
            </div>
            <nav aria-label="Main navigation">
                <LogoutButton />
            </nav>
        </header>
    );
}