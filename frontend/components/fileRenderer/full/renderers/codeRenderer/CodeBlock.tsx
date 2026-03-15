import "./CodeBlock.css";
import { getHighlighter } from "@/lib/code/highlighter";
import { CodeFile } from "@/types/code";
import { LANGUAGES } from "@/lib/code/languages";
import IconCopyButton from "@/components/ui/buttons/IconCopyButton";


interface CodeBlockProps {
	file: CodeFile;
}

export default async function CodeBlock({ file }: CodeBlockProps) {
	const lang = LANGUAGES.find(l => l.value === file.language)?.value ?? "javascript";
	const codeHighlighter = await getHighlighter();

	return (
		<div className="col-span-10">
			<div className="flex flex-row items-center justify-between bg-surface p-md rounded-t-lg border-x border-t border-border-strong">
				<p>
					{file.title}
				</p>
				<IconCopyButton code={file.content} fileTitle={file.title} />
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