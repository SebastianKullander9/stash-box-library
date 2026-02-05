"use client";

import { ResourceFile } from "@/types";
import { useState, useEffect } from "react";
import FontInput from "@/components/ui/inputs/FontInput";
import FontSizeSelect from "@/components/ui/inputs/FontSizeSelect";
import FontRangeInput from "@/components/ui/inputs/fontRangeInput/FontRangeInput";
import FontRow from "./FontRow";

interface VariableFontStylesProps {
	files: ResourceFile[];
}

export const fontSizes = [8, 12, 14, 20, 24, 32, 40, 64, 96, 120, 184, 280];

export default function VariableFontStyles({ files }: VariableFontStylesProps) {
	const [previewText, setPreviewText] = useState("");
	const [px, setPx] = useState(64);
	const [width, setWidth] = useState(0);
	const variableFontFile = files.find(f => f.fontMetadata?.isVariable);
	const variableAxes = variableFontFile?.fontMetadata?.variableAxes || [];
	const [weightAxis, widthAxis] = variableAxes;

	useEffect(() => {
		if (widthAxis) {
			setWidth(Math.round((widthAxis.min + widthAxis.max) / 2));
		}
	}, [widthAxis]);

	if (!variableFontFile) return <div>No variable font found. Something is wrong..</div>;

	const weightSteps = [];
		if (weightAxis) {
			for (let i = weightAxis.min; i <= weightAxis.max; i += 100) {
			weightSteps.push(i);
		}
	}

	const widthSteps = [];
	if (widthAxis) {
		for (let i = widthAxis.min; i <= widthAxis.max; i++) {
			widthSteps.push(i);
		}
	}
	
	return (
		<div className="flex flex-col gap-xl">
			<div className="w-full flex items-center gap-lg flex-col md:flex-row">
				<FontInput 
					state={previewText} 
					setState={setPreviewText} 
					className="bg-surface p-md px-xl rounded-full flex-1"
				/>
				<div className="flex flex-col gap-xl items-center">
					<div className="flex flex-row gap-xl items-center">
						<div className="flex flex-col md:flex-row items-center gap-sm md:gap-xl">
							<p className="text-center">Font size</p>
							<FontSizeSelect 
								name="fontSize" 
								options={fontSizes} 
								state={px} 
								setState={setPx} 
							/>
						</div>
						
						<FontRangeInput 
							options={fontSizes} 
							state={px} 
							setState={setPx} 
						/>
					</div>
					<div className="flex flex-row gap-xl items-center">
						<div className="flex flex-col md:flex-row items-center gap-sm md:gap-xl">
							<p className="text-center">Font weight</p>
							<div className="bg-surface py-md min-w-20 flex justify-center rounded-md">
								<p>
									{width}
								</p>
							</div>
						</div>
						
						<FontRangeInput
							options={widthSteps}
							state={width}
							setState={setWidth}
						/>
					</div>
				</div>
			</div>
			<div>
				{weightSteps.map((weight, index) => (
					<FontRow
						key={weight + index} 
						file={variableFontFile} 
						previewText={previewText} 
						px={px}
						style={{ fontVariationSettings: `"wght" ${weight}, "wdth" ${width}` }}
						weight={weight}
					/>
				))}
				
			</div>
		</div>
	);
};