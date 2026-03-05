import { Module } from "@nestjs/common";
import { ColorPaletteService } from "./services/color-palette.service";
import { ColorPaletteResolver } from "./resolvers/color-palette.resolver";
import { TokenValidationService } from "./services/token-validation.service";
import { CategoryLookupService } from "./services/category-lookup.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
	providers: [
		ColorPaletteResolver,
		ColorPaletteService,
		TokenValidationService,
		CategoryLookupService,
		PrismaService,
	],
	exports: [ColorPaletteService],
})
export class ColorPaletteModule {}
