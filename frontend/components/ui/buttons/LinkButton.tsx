import Link from "next/link"

type LinkButtonProps = {
    label: string;
    href: string;
}

export default function LinkButton({ label, href }: LinkButtonProps) {
    return (
        <Link 
            href={href} 
            className="w-full bg-[var(--color-white)] text-black text-normal p-2 p-normal hover:bg-gray-300 transition-colors duration-200 rounded-sm 
            cursor-pointer inline-block text-center"
        >
            {label}
        </Link>
    )
}