import { JSX } from "react";
import TextOnBackground from "./jsxExamples/TextOnBackground";
import Card from "./jsxExamples/Card";
import ExampleButton from "./jsxExamples/ExampleButton";
import ExampleAlert from "./jsxExamples/ExampleAlert";

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
	render: (palette: Palette, key: string) => JSX.Element;
};

export const COLOR_PALETTE_CONTEXTS: PaletteContext[] = [
	{
		id: "text-on-background",
		label: "Text on background",
		required: ["background", "text"],
		render: (tokens, key) => <TextOnBackground tokens={tokens} key={key} />,
	},
	{
		id: "card",
		label: "Card",
		required: ["background", "surface", "text", "border"],
		render: (tokens, key) => <Card tokens={tokens} key={key} />
	},
	{
		id: "primary-button",
		label: "Primary button",
		required: ["primary", "text"],
		render: (tokens, key) => <ExampleButton tokens={tokens} primary={true} key={key} />
	},
		{
		id: "secondary-button",
		label: "Secondary button",
		required: ["secondary", "text"],
		render: (tokens, key) => <ExampleButton tokens={tokens} primary={false} key={key} />
	},
		{
		id: "success-alert",
		label: "Success alert",
		required: ["success"],
		render: (tokens, key) => <ExampleAlert tokens={tokens} variation="success" key={key}/>
	},
		{
		id: "warning-alert",
		label: "Warning alert",
		required: ["warning"],
		render: (tokens, key) => <ExampleAlert tokens={tokens} variation="warning" key={key}/>
	},
		{
		id: "error-alert",
		label: "Error alert",
		required: ["error"],
		render: (tokens, key) => <ExampleAlert tokens={tokens} variation="error" key={key}/>
	},
]