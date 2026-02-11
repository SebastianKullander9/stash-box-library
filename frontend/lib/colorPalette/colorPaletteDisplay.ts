export const COLOR_ROLE_HEIGHTS_THUMBNAIL: Record<string, number> = {
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

export const COLOR_ROLE_WIDTHS_FULL_DISPLAY: Record<string, number> = {
	"primary": 150,
	"secondary": 120,
	"accent": 100,
	"success": 80,
	"warning": 46,
	"error": 40,
	"danger": 40,
	"info": 40,
	"neutral": 40,
	"background": 40,
	"surface": 40,
	"text": 40,
	"border": 40,
}

export function getColorHeightWeightThumbnail(role: string): number {
  	return COLOR_ROLE_HEIGHTS_THUMBNAIL[role.toLowerCase()];
}

export function getColorHeightWeightFullDisplay(role: string): number {
  	return COLOR_ROLE_WIDTHS_FULL_DISPLAY[role.toLowerCase()];
}