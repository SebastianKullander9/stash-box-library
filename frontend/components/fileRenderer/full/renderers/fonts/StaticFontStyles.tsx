"use client";

import { useState } from "react";
import { ResourceFile } from "@/types";
import FontRow from "./FontRow";
import FontInput from "@/components/ui/inputs/FontInput";
import FontSizeSelect from "@/components/ui/inputs/FontSizeSelect";
import FontRangeInput from "@/components/ui/inputs/fontRangeInput/FontRangeInput";

interface StaticFontStylesProps {
	files: ResourceFile[];
}

export const fontSizes = [8, 12, 14, 20, 24, 32, 40, 64, 96, 120, 184, 280];

export default function StaticFontStyles({ files }: StaticFontStylesProps) {
	const [previewText, setPreviewText] = useState("");
	const [px, setPx] = useState(64);

	return (
		<div className="flex flex-col gap-xl">
			<div className="w-full flex items-center gap-lg flex-col md:flex-row">
				<FontInput 
					state={previewText} 
					setState={setPreviewText} 
					className="bg-surface p-md px-xl rounded-full flex-1"
				/>
				<div className="flex flex-row gap-xl items-center">
					<FontSizeSelect 
						name="fontSize" 
						options={fontSizes} 
						state={px} 
						setState={setPx} 
					/>
					<FontRangeInput 
						options={fontSizes} 
						state={px} 
						setState={setPx} 
					/>
				</div>
			</div>
			<div className="flex flex-col gap-xl">
				{files.map((file) => (
					<FontRow 
						key={file.url} 
						file={file} 
						previewText={previewText} 
						px={px} 
					/>
				))}
			</div>
		</div>
	);
};