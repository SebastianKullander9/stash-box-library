import { cache } from "react";
import { getOneColorPalette } from "@/actions/colorPalette";

export const getCachedColorPalette = cache(getOneColorPalette);