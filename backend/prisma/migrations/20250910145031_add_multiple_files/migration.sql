/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Resource" DROP COLUMN "fileUrl",
ADD COLUMN     "textContent" TEXT;

-- CreateTable
CREATE TABLE "public"."File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
