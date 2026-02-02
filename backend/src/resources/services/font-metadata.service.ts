import { Injectable } from "@nestjs/common";
import opentype, { Font } from "opentype.js";

interface VariableAxis {
	tag: string;
	minValue: number;
	maxValue: number;
	defaultValue?: number;
	name?: Record<string, string>;
}

@Injectable()
export class FontService {
	parseFont(buffer: ArrayBuffer) {
		const font: Font = opentype.parse(buffer);

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

	scoreFont(font: Font) {
		const weight: number = (font.tables.os2?.usWeightClass as number) ?? 400;
		const width = (font.tables.os2.usWidthClass as number) ?? 5;
		const subfamily = font.names.fontSubfamily?.en?.toLowerCase() ?? "";

		let score = 0;

		score -= Math.abs(weight - 400);

		if (width === 5) score += 10;

		if (subfamily.includes("regular")) score += 50;

		if (subfamily.includes("italic")) score -= 20;

		return score;
	}
}
