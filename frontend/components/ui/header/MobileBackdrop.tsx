type menuItem = {
    title: string;
}

interface MobileBackdropProps {
    menuItems: menuItem[];
    isOpen: boolean;
}

export default function MobileBackdrop({ menuItems, isOpen }: MobileBackdropProps) {
    return (
        <div className={`absolute inset-0 bg-black w-screen h-screen z-[10] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <ul className="h-full flex flex-col justify-center items-center text-4xl gap-4">
                    <li>Home</li>
                {menuItems.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}