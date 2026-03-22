-- Resource
ALTER TABLE "Resource"
ADD COLUMN "searchVector" tsvector
    GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce("textContent", '')), 'B')
    ) STORED;

ALTER TABLE "Resource" ADD COLUMN "tagsVector" tsvector;

-- Code
ALTER TABLE "Code"
ADD COLUMN "searchVector" tsvector
    GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'B')
    ) STORED;

ALTER TABLE "Code" ADD COLUMN "tagsVector" tsvector;

-- ColorPalette
ALTER TABLE "ColorPalette"
ADD COLUMN "searchVector" tsvector
    GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(code, '')), 'C')
    ) STORED;

ALTER TABLE "ColorPalette" ADD COLUMN "tagsVector" tsvector;

-- GIN indexes
CREATE INDEX resource_search_idx ON "Resource" USING GIN("searchVector");
CREATE INDEX resource_tags_idx ON "Resource" USING GIN("tagsVector");
CREATE INDEX code_search_idx ON "Code" USING GIN("searchVector");
CREATE INDEX code_tags_idx ON "Code" USING GIN("tagsVector");
CREATE INDEX palette_search_idx ON "ColorPalette" USING GIN("searchVector");
CREATE INDEX palette_tags_idx ON "ColorPalette" USING GIN("tagsVector");