export const LANGUAGES = [
	{ label: "JSX", value: "jsx" },
	{ label: "JavaScript", value: "javascript" },
	{ label: "TypeScript", value: "typescript" },
	{ label: "TSX", value: "tsx" },
	{ label: "CSS", value: "css" },
	{ label: "HTML", value: "html" },
] as const;

export type LanguageValue = typeof LANGUAGES[number]["value"];