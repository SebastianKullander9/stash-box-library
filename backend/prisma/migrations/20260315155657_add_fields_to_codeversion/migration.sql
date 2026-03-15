/*
  Warnings:

  - Added the required column `message` to the `CodeVersion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionNumber` to the `CodeVersion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CodeVersion" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "versionNumber" INTEGER NOT NULL;
