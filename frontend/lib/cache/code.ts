import { cache } from "react";
import { getOneCode } from "@/actions/code";

export const getCachedCode = cache(getOneCode);