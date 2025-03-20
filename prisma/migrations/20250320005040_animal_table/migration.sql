-- CreateTable
CREATE TABLE "animal" (
    "id" UUID NOT NULL,
    "association_id" UUID NOT NULL,
    "specie_id" UUID NOT NULL,
    "publication_id" UUID,
    "breed_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "animal_name_key" ON "animal"("name");

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
