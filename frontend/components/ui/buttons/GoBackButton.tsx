import Link from "next/link";

type GoBackButtonProps = {
    label: string;
    href: string;
}

export default function GoBackButton({ label, href }: GoBackButtonProps) {
    return (
        <Link href={href}>
            <button className="px-3 py-2 border-1 border-[var(--color-white)] text-white rounded-full cursor-pointer">
                {label}
            </button>
        </Link>
    )
}