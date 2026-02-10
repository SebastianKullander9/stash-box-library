export const COLOR_ROLE_SIZES: Record<string, number> = {
	"primary": 30,
	"secondary": 25,
	"accent": 20,
	"success": 0,
	"warning": 0,
	"error": 0,
	"danger": 0,
	"info": 0,
	"neutral": 0,
	"background": 15,
	"surface": 0,
	"text": 10,
	"border": 0,
};

export function getColorHeightWeight(role: string): number {
  	return COLOR_ROLE_SIZES[role.toLowerCase()];
}