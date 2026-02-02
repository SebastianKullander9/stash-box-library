/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `FontMetadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FontMetadata_fileId_key" ON "public"."FontMetadata"("fileId");
