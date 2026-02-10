import { ColorPalette } from "@/types/colorPalette";
import FormattedDate from "@/components/ui/date/FormattedDate";
import { getColorHeightWeight } from "@/lib/colorPaletteDisplay";
import Link from "next/link";

interface ColorPaletteThumbnail {
	colorPalette: ColorPalette;
}

export default function ColorPaletteThumbnail({ colorPalette }: ColorPaletteThumbnail) {
	const totalWeight = colorPalette.tokens.reduce((sum, token) => 
		sum + getColorHeightWeight(token.role), 0
	);

	const sortedTokens = [...colorPalette.tokens].sort(
		(a, b) => (a.order ?? 999) - (b.order ?? 999)
	);

	return (
		<Link
			className="col-span-3 flex flex-col h-90 bg-surface rounded-lg overflow-hidden"
			href={`/colors/${colorPalette.id}`}
		>
			<div className="p-md">
				<div className="flex flex-row justify-between">
					<p className="text-text-secondary">{colorPalette.name}</p>
					<div className="text-text-tertiary text-xs">
						<FormattedDate createdAt={colorPalette.createdAt} />
					</div>
				</div>
				<p className="">{colorPalette.code}</p>
			</div>
			

			<div className="flex-1 flex-col">
				{sortedTokens.map((token, index) => {
					const weight = getColorHeightWeight(token.role);
					const heightPercentage = (weight / totalWeight) * 100;

					return (
						<div
							key={`${token.value}-${index}`}
							className="w-full"
							style={{ 
								backgroundColor: token.value,
								height: `${heightPercentage}%`
							 }}
						/>
					)
				})}
			</div>
		</Link>
	);
};