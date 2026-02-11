export function getContrastColor(hexColor: string): string {
  const c = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;

  const hex = c.length === 3 ? c.split('').map(x => x + x).join('') : c;

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#ffffff';
}