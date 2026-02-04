import downloadIcon from "../../../public/svgs/cloud-download.svg";
import Image from "next/image";

type DownloadButtonProps = {
    label: string;
    url: string;
}

export default function DownloadButton({ label, url }: DownloadButtonProps) {
    return (
        <button className="p-2 bg-[var(--color-white)] text-black text-normal p-normal flex flex-row gap-2 items-center rounded-sm hover:bg-gray-300 cursor-pointer">
            <Image src={downloadIcon} width={20} height={20} alt={`Download ${label}`} />
            {label}
        </button>
    )
}