import ColorPaletteRenderer from "@/components/fileRenderer/thumbnail/ColorPaletteRenderer";
import { ColorPalettesPage } from "@/types/colorPalette";
import CategoryPage from "../CategoryPage";

interface ColorPageProps {
    colorPalettes: ColorPalettesPage;
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
}

export default function ColorPage({
    colorPalettes,
    currentPage,
    totalCount,
    itemsPerPage,
}: ColorPageProps) {
    return (
        <div>
            <CategoryPage
                currentPage={currentPage}
                totalCount={totalCount}
                itemsPerPage={itemsPerPage}
                pathname="Colors"
            >
                <ColorPaletteRenderer colorPalettes={colorPalettes.items} />
            </CategoryPage>
        </div>
    );
}
