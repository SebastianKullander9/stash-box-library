import { createHighlighter } from "shiki";
import { LANGUAGES } from "./languages";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function getHighlighter() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ["vitesse-dark"],
			langs: LANGUAGES.map(l => l.value),
		});
	}

	return highlighter;
}