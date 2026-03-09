import { Code } from "@/types/code";
import CodeThumbnail from "./renderers/CodeThumbnail";

interface CodesRendererProps {
	codes: Code[];
}

export default function CodesRenderer({ codes }: CodesRendererProps) {
	return (
		<section className="container grid grid-cols-12 section-x-padding md:px-0 gap-xl">
			{codes.map((code) => (
				<CodeThumbnail
					key={code.id}
					code={code}
				/>
			))}
		</section>
	);
};