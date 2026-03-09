import { Code } from "@/types/code";
import FormattedDate from "@/components/ui/date/FormattedDate";
import { File } from "lucide-react";
import Link from "next/link";
import { getHighlighter } from "@/lib/code/highlighter";
import { getCodePreview } from "@/lib/code/code-utils";
import { LANGUAGES } from "@/lib/code/languages";

interface CodeThumbnailProps {
	code: Code;
}

export default async function CodeThumbnail({ code }: CodeThumbnailProps) {
	if (!code.codeFiles.length) return null;

	const primaryFile = code.codeFiles[0];
	const primaryLang = LANGUAGES.find(l => l.value === primaryFile.language)?.value ?? "javascript";

	const codeHighlighter = await getHighlighter();
	const codePreview = getCodePreview(primaryFile.content, 8);

	return (
		<Link
			href={`/codes/${code.id}`}
			className="col-span-4 bg-surface p-md rounded-lg flex flex-col gap-md border border-surface hover:border-border-strong"
			aria-label={`View code: ${code.title}`}
		>
			<div className="flex flex-row justify-between">
				<p>
					{code.title}
				</p>
				<div className="text-xs text-text-tertiary">
					<FormattedDate createdAt={code.createdAt} />
				</div>
			</div>
			<p className="text-text-secondary">
				{code.description}
			</p>
			<div>
				<p className="text-text-secondary">
					Languages:
				</p>
				{code.codeFiles.map((codeFile) => (
					<p key={codeFile.id}>
						{LANGUAGES.find(l => l.value === codeFile.language)?.label ?? codeFile.language}
					</p>
				))}
			</div>
			<div className="flex flex-col gap-1">
				<div className="flex flex-row justify-between text-xs">
					<div>
						<p className="text-text-secondary">
							{primaryFile.title}
						</p>
					</div>
					{code.codeFiles.length > 1 && (
						<div className="flex flex-row items-center text-xs">
							<File size={16} />
							<p>
								+{code.codeFiles.length - 1} files
							</p>
						</div>
					)}
				</div>
				<div 
					dangerouslySetInnerHTML={{ 
						__html: codeHighlighter.codeToHtml(codePreview, { 
							theme: "vitesse-dark", 
							lang: primaryLang
						}) 
					}}
					className="text-xs overflow-hidden [&_pre]:p-md [&_pre]:rounded-lg"
				/>
			</div>
		</Link>
	);
};