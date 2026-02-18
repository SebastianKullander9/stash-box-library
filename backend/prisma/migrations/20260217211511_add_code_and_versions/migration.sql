-- CreateTable
CREATE TABLE "public"."Code" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CodeVersion" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CodeTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CodeTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CodeTags_B_index" ON "public"."_CodeTags"("B");

-- AddForeignKey
ALTER TABLE "public"."CodeVersion" ADD CONSTRAINT "CodeVersion_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "public"."Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CodeTags" ADD CONSTRAINT "_CodeTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Code"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CodeTags" ADD CONSTRAINT "_CodeTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
