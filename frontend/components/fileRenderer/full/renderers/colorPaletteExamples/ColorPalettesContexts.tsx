import { JSX } from "react";
import TextOnBackground from "./jsxExamples/TextOnBackground";
import Card from "./jsxExamples/Card";
import ExampleButton from "./jsxExamples/ExampleButton";

type ColorRole =
	| "primary"
	| "secondary"
	| "accent"
	| "success"
	| "warning"
	| "error"
	| "danger"
	| "info"
	| "neutral"
	| "background"
	| "surface"
	| "text"
	| "border";

type Palette = Partial<Record<ColorRole, string>>;
export type ColorPaletteTokens = Partial<Record<ColorRole, string>>;

type PaletteContext = {
	id: string;
	label: string;
	required: ColorRole[];
	optional?: ColorRole[];
	render: (palette: Palette) => JSX.Element;
};

export const COLOR_PALETTE_CONTEXTS: PaletteContext[] = [
	{
		id: "text-on-background",
		label: "Text on background",
		required: ["background", "text"],
		render: (tokens) => <TextOnBackground tokens={tokens} />,
	},
	{
		id: "card",
		label: "Card",
		required: ["background", "surface", "text", "border"],
		render: (tokens) => <Card tokens={tokens} />
	},
	{
		id: "primary-button",
		label: "Primary button",
		required: ["primary", "text"],
		render: (tokens) => <ExampleButton tokens={tokens} primary={true} />
	},
		{
		id: "secondary-button",
		label: "Secondary button",
		required: ["secondary", "text"],
		render: (tokens) => <ExampleButton tokens={tokens} primary={false} />
	},
		{
		id: "success-alert",
		label: "Success alert",
		required: ["success"],
		render: () => (
			<div>

			</div>
		)
	},
		{
		id: "warning-alert",
		label: "Warning alert",
		required: ["warning"],
		render: () => (
			<div>

			</div>
		)
	},
		{
		id: "error-alert",
		label: "Error alert",
		required: ["error"],
		render: () => (
			<div>

			</div>
		)
	},
]