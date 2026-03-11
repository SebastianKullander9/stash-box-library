import "./CodeBlock.css";
import { getHighlighter } from "@/lib/code/highlighter";
import { Code } from "@/types/code";
import { LANGUAGES } from "@/lib/code/languages";
import IconCopyButton from "@/components/ui/buttons/IconCopyButton";


interface CodeBlockProps {
	resource: Code;
}

export default async function CodeBlock({ resource }: CodeBlockProps) {
	console.log(resource.codeFiles[0])

	const primaryFile = resource.codeFiles[0];
	const primaryLang = LANGUAGES.find(l => l.value === primaryFile.language)?.value ?? "javascript";
	const codeHighlighter = await getHighlighter();

	return (
		<div className="col-span-6">
			<div className="flex flex-row items-center justify-between">
				<p>
					{primaryFile.title}
				</p>
				<IconCopyButton code={primaryFile.content} fileTitle={primaryFile.title} />
			</div>
			<div 
				dangerouslySetInnerHTML={{ 
					__html: codeHighlighter.codeToHtml(primaryFile.content, { 
						theme: "vitesse-dark", 
						lang: primaryLang
					}) 
				}}
				className="text-xs [&_pre]:overflow-x-auto [&_pre]:p-md [&_pre]:rounded-lg"
			/>
		</div>
	);
};