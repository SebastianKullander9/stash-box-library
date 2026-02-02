-- CreateTable
CREATE TABLE "public"."FontMetadata" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "subfamily" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "isVariable" BOOLEAN NOT NULL,
    "variableAxes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FontMetadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FontMetadata" ADD CONSTRAINT "FontMetadata_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FontMetadata" ADD CONSTRAINT "FontMetadata_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
