-- DropForeignKey
ALTER TABLE "public"."FontMetadata" DROP CONSTRAINT "FontMetadata_resourceId_fkey";

-- AddForeignKey
ALTER TABLE "public"."FontMetadata" ADD CONSTRAINT "FontMetadata_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
