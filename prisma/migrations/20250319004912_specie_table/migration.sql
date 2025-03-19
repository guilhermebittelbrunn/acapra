-- CreateTable
CREATE TABLE "specie" (
    "id" UUID NOT NULL,
    "association_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sequence" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "specie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specie_name_key" ON "specie"("name");
