import { ColorPaletteTokens } from "../ColorPalettesContexts";

interface CardProps {
	tokens: ColorPaletteTokens;
}

export default function Card({ tokens }: CardProps) {
	return (
		<div 
			className="col-span-4 min-h-80 p-xl rounded-lg"
			style={{ 
				backgroundColor: tokens.background,
				color: tokens.text
			 }}
		>
			<div
				className="h-full rounded-lg p-md flex flex-col gap-xl"
				style={{
					backgroundColor: tokens.surface,
					border: `1px solid ${tokens.border}`
				}}
			>
				<h1 className="heading-4">
					Card header
				</h1>
				<p>
					Just some placeholder text for visualizing this card.
					Just some placeholder text for visualizing this card.
					Just some placeholder text for visualizing this card.
					Just some placeholder text for visualizing this card.
				</p>
			</div>
		</div>
	);
};