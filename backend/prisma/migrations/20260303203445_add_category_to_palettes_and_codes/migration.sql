-- AlterTable
ALTER TABLE "public"."Code" ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "public"."ColorPalette" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."ColorPalette" ADD CONSTRAINT "ColorPalette_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Code" ADD CONSTRAINT "Code_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
