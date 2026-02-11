import { ColorPalette } from "@/types/colorPalette";
import FormattedDate from "@/components/ui/date/FormattedDate";
import { getColorHeightWeightFullDisplay } from "@/lib/colorPalette/colorPaletteDisplay";
import { getContrastColor } from "@/lib/colorPalette/colorContrast";

interface ColorPaletteRendererHomeProps {
	colorPalette: ColorPalette;
}

export default function ColorPaletteRendererHome({ colorPalette }: ColorPaletteRendererHomeProps) {
	return (
		<div className="col-span-12 bg-surface p-md rounded-tr-lg rounded-b-lg flex flex-col gap-md">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<p className="text-base">{colorPalette.name}</p>
					<p className="text-xs text-text-secondary">{colorPalette.code}</p>
				</div>
				<div className="text-xs text-text-tertiary">
					<FormattedDate createdAt={colorPalette.createdAt} />
				</div>
			</div>
			<div className="flex flex-col">
				{colorPalette.tokens.map((token, index) => {
					const height = getColorHeightWeightFullDisplay(token.role);
					const textColor = getContrastColor(token.value);

					return (
						<div className="w-full relative group-hover first:rounded-t-lg last:rounded-b-lg overflow-hidden" key={index}>
							<div 
								className="p-xs"
								style={{ 
									backgroundColor: token.value,
									height: `${height}px`,
									color: textColor,
								}}
							>
								<p className="first-letter:uppercase">
									{token.role}
								</p>
							</div>

							<div className="absolute inset-0 flex justify-center items-center group">
								<div 
									style={{ color: textColor }} 
									className="opacity-0 group-hover:opacity-100 bg-gray-300/30 py-[2px] px-[10px] rounded-lg transition-opacity duration-250"
								>
									{token.value}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
};