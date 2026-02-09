-- CreateTable
CREATE TABLE "public"."ColorPalette" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorPalette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ColorToken" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "role" TEXT,
    "order" INTEGER,
    "paletteId" TEXT NOT NULL,

    CONSTRAINT "ColorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ColorPaletteTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ColorPaletteTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ColorPaletteTags_B_index" ON "public"."_ColorPaletteTags"("B");

-- AddForeignKey
ALTER TABLE "public"."ColorToken" ADD CONSTRAINT "ColorToken_paletteId_fkey" FOREIGN KEY ("paletteId") REFERENCES "public"."ColorPalette"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ColorPaletteTags" ADD CONSTRAINT "_ColorPaletteTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ColorPalette"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ColorPaletteTags" ADD CONSTRAINT "_ColorPaletteTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
