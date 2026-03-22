-- DropIndex
DROP INDEX "code_search_idx";

-- DropIndex
DROP INDEX "code_tags_idx";

-- DropIndex
DROP INDEX "palette_search_idx";

-- DropIndex
DROP INDEX "palette_tags_idx";

-- DropIndex
DROP INDEX "resource_search_idx";

-- DropIndex
DROP INDEX "resource_tags_idx";

-- AlterTable
ALTER TABLE "Code" ALTER COLUMN "searchVector" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ColorPalette" ALTER COLUMN "searchVector" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "searchVector" DROP DEFAULT;
