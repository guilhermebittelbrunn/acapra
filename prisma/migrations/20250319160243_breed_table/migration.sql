-- CreateTable
CREATE TABLE "breed" (
    "id" UUID NOT NULL,
    "association_id" UUID NOT NULL,
    "specie_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sequence" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "breed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "breed_name_key" ON "breed"("name");

-- AddForeignKey
ALTER TABLE "breed" ADD CONSTRAINT "breed_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
