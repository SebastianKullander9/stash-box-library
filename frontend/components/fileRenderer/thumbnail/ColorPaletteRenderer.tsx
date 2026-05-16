import { ColorPalette } from "@/types/colorPalette";
import ColorPaletteThumbnail from "./renderers/ColorPaletteThumbnail";
import EmptyState from "@/components/ui/emptyState/EmptyState";

interface ColorPaletteRendererProps {
    colorPalettes: ColorPalette[];
}

export default function ColorPaletteRenderer({ colorPalettes }: ColorPaletteRendererProps) {
    return (
        <section className="grid grid-cols-12 gap-lg m-sm">
            {colorPalettes.map((colorPalette: ColorPalette) => (
                <ColorPaletteThumbnail key={colorPalette.id} colorPalette={colorPalette} />
            ))}
        </section>
    );
}
