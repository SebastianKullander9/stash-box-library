import { ColorPalette } from "@/types/colorPalette";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ColorPaletteRendererExportProps {
	colorPalette: ColorPalette;
}

export default function ColorPaletteRendererExport({ colorPalette }: ColorPaletteRendererExportProps) {
	let codeBlockTailwind = `@theme {\n`;
	colorPalette.tokens.map((token) => {
		codeBlockTailwind += `	--color-${token.role}: ${token.value};\n`
	})
	codeBlockTailwind += `}`


	return (
		<div className="col-span-12 min-h-screen bg-surface p-md rounded-lg">
			<SyntaxHighlighter 
				language="css" 
				style={tomorrow}
				customStyle={{
					borderRadius: "8px",
					display: "inline-block"
				}}
			>
				{codeBlockTailwind}
			</SyntaxHighlighter>
		</div>
	);
};