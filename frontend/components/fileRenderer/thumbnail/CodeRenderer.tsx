import { Code } from "@/types/code";
import CodeThumbnail from "./renderers/CodeThumbnail";

interface CodesRendererProps {
    codes: Code[];
}

export default function CodesRenderer({ codes }: CodesRendererProps) {
    return (
        <section className="grid grid-cols-12 m-sm gap-lg">
            {codes.map((code) => (
                <CodeThumbnail key={code.id} code={code} />
            ))}
        </section>
    );
}
