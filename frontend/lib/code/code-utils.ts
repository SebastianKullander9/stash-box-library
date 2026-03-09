export function getCodePreview(content: string, lineCount = 8): string {
	const lines = content.split("\n");

	const meaningfulStart = lines.findIndex((line) => 
		/^(export\s+)?(default\s+)?(function|class|const|let|var)\s+\w+/.test(line.trim())
	);

	const startIndex = meaningfulStart !== -1 ? meaningfulStart : 0;

	let code = lines.slice(startIndex, startIndex + lineCount).join("\n");
	const indentCount = lines[startIndex + lineCount - 1]?.match(/^(\s*)/)?.[1].length ?? 0;

	code += `\n${" ".repeat(indentCount)}
	// ...
	`;

	return code
}