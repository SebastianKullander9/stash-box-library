import { Injectable } from "@nestjs/common";
import { Font } from "opentype.js";

interface VariableAxis {
	tag: string;
	minValue: number;
	maxValue: number;
	defaultValue?: number;
	name?: Record<string, string>;
}

@Injectable()
export class FontService {
	parseFont(font: Font) {
		const family: string = font.names.fontFamily?.en ?? "unknown";
		const subfamily: string = font.names.fontSubfamily?.en ?? "Regular";
		const weight: number = (font.tables.os2?.usWeightClass as number) ?? 400;

		const variableAxes: { tag: string; min: number; max: number }[] =
			(font.tables.fvar?.axes as VariableAxis[] | undefined)?.map((a) => ({
				tag: a.tag,
				min: a.minValue,
				max: a.maxValue,
			})) ?? [];

		const isVariable = variableAxes.length > 0;

		return { family, subfamily, weight, variableAxes, isVariable };
	}

	scoreFontForThumbnail(font: Font): number {
		const axes = font.tables.fvar?.axes as VariableAxis[] | undefined;

		if (axes && axes.length > 0) {
			return 0;
		}

		let distance = 0;

		const weight = (font.tables.os2?.usWeightClass as number) ?? 400;
		const width = (font.tables.os2?.usWidthClass as number) ?? 5;
		const subfamily = font.names.fontSubfamily?.en?.toLowerCase() ?? "";

		distance += Math.abs(weight - 400) / 50;

		distance += Math.abs(width - 5) * 2;

		if (subfamily.includes("italic")) distance += 5;

		if (
			subfamily.includes("thin") ||
			subfamily.includes("ultra") ||
			subfamily.includes("black") ||
			subfamily.includes("condensed") ||
			subfamily.includes("expanded")
		) {
			distance += 3;
		}

		if (axes) {
			for (const axis of axes) {
				const center = (axis.minValue + axis.maxValue) / 2;
				const def = axis.defaultValue ?? center;
				distance += Math.abs(def - center) / (axis.maxValue - axis.minValue);
			}
		}

		return distance;
	}
}
