import "./CodeBlock.css";
import { getHighlighter } from "@/lib/code/highlighter";
import { CodeFile } from "@/types/code";
import { Code } from "@/types/code";
import { LANGUAGES } from "@/lib/code/languages";
import IconCopyButton from "@/components/ui/buttons/IconCopyButton";
import IconEditButton from "@/components/ui/buttons/IconEditButton";
import Link from "next/link";
import { cookies } from "next/headers";

interface CodeBlockProps {
	resource: Code;
	file: CodeFile;
}

export default async function CodeBlock({ file, resource }: CodeBlockProps) {
	const lang = LANGUAGES.find(l => l.value === file.language)?.value ?? "javascript";
	const codeHighlighter = await getHighlighter();
	const href = `/code/${resource.id}/edit`;

	const cookieStore = await cookies();
	const isAdmin = !!cookieStore.get("token")?.value;

	return (
		<div>
			<div className="flex flex-row items-center justify-between bg-surface rounded-t-lg border-x border-t border-border-strong px-md py-xs">
				<p className="border border-surface">
					{file.title}
				</p>
				<div className="flex flex-row">
					{isAdmin && (
						<Link href={href}>
							<IconEditButton />
						</Link>
					)}
					<IconCopyButton code={file.content} fileTitle={file.title} isAdmin={isAdmin} />
				</div>
			</div>
			<div 
				dangerouslySetInnerHTML={{ 
					__html: codeHighlighter.codeToHtml(file.content, { 
						theme: "vitesse-dark", 
						lang
					}) 
				}}
				className="text-[12px] [&_pre]:overflow-x-auto [&_pre]:p-md [&_pre]:rounded-lg border-b border-x border-border-strong rounded-b-lg"
			/>
		</div>
	);
};