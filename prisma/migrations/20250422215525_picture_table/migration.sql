-- CreateTable
CREATE TABLE "picture" (
    "id" UUID NOT NULL,
    "entity_id" UUID,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "sequence" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("id")
);
