import { GoArrowUpRight } from "react-icons/go";

export default function ViewMoreButton() {
	return (
		<button className="rounded-full flex items-center border justify-center p-xs cursor-pointer">
			<GoArrowUpRight size={26} className="hover:scale-115 transition-base transition-transform" />
		</button>
	);
};