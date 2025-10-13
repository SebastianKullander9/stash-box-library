import Image from "next/image";
import sliders from "../../../public/svgs/sliders-horizontal.svg";
import x from "../../../public/svgs/x.svg";

type FilterButtonProps = {
    state: boolean;
    toggle: () => void;
}

export default function FilterButton({ state, toggle }: FilterButtonProps) {
    return (
        <button onClick={toggle} className="px-4 py-2 border-1 border-[var(--color-white)] text-white text-normal p-normal rounded-full flex flex-row items-center gap-1 cursor-pointer">
            <Image src={sliders} height={17} width={17} alt="toggle slider menu" className="invert brightness-0" /> Filters
        </button>
    );
}