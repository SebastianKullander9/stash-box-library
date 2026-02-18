/*
  Warnings:

  - You are about to drop the column `content` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Code` table. All the data in the column will be lost.
  - You are about to drop the column `codeId` on the `CodeVersion` table. All the data in the column will be lost.
  - Added the required column `codeFileId` to the `CodeVersion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CodeVersion" DROP CONSTRAINT "CodeVersion_codeId_fkey";

-- AlterTable
ALTER TABLE "public"."Code" DROP COLUMN "content",
DROP COLUMN "language";

-- AlterTable
ALTER TABLE "public"."CodeVersion" DROP COLUMN "codeId",
ADD COLUMN     "codeFileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."CodeFile" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CodeFile" ADD CONSTRAINT "CodeFile_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "public"."Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CodeVersion" ADD CONSTRAINT "CodeVersion_codeFileId_fkey" FOREIGN KEY ("codeFileId") REFERENCES "public"."CodeFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
