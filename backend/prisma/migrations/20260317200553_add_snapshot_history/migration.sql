/*
  Warnings:

  - You are about to drop the column `message` on the `CodeVersion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."CodeFile" ADD COLUMN     "addedInSnapshotId" TEXT;

-- AlterTable
ALTER TABLE "public"."CodeVersion" DROP COLUMN "message",
ADD COLUMN     "snapshotId" TEXT;

-- CreateTable
CREATE TABLE "public"."CodeSnapshot" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeletedFile" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeletedFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CodeFile" ADD CONSTRAINT "CodeFile_addedInSnapshotId_fkey" FOREIGN KEY ("addedInSnapshotId") REFERENCES "public"."CodeSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CodeVersion" ADD CONSTRAINT "CodeVersion_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "public"."CodeSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CodeSnapshot" ADD CONSTRAINT "CodeSnapshot_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "public"."Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeletedFile" ADD CONSTRAINT "DeletedFile_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "public"."CodeSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
