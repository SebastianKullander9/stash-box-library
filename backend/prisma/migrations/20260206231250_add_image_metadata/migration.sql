-- CreateTable
CREATE TABLE "public"."ImageMetadata" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageMetadata_fileId_key" ON "public"."ImageMetadata"("fileId");

-- AddForeignKey
ALTER TABLE "public"."ImageMetadata" ADD CONSTRAINT "ImageMetadata_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImageMetadata" ADD CONSTRAINT "ImageMetadata_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
