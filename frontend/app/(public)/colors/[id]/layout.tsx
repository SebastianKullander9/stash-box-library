import React, { ReactElement } from "react";
import Tabs from "@/components/ui/colorPalette/Tabs";
import { getOneColorPalette } from "@/actions/colorPalette";
import { ColorPalette } from "@/types/colorPalette";

export default async function PaletteLayout({
    children,
    params,
}: {
    children: ReactElement<{ colorPalette: ColorPalette }>;
    params: { id: string };
}) {
    const colorPalette = await getOneColorPalette(params.id);

    return (
        <section className="grid grid-cols-12 container section-x-padding md:p-0">
            <Tabs id={params.id} />
            {React.cloneElement(children, { colorPalette })}
        </section>
    );
}