-- DropIndex
DROP INDEX "animal_name_key";

-- CreateTable
CREATE TABLE "tag_animal" (
    "id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,
    "animal_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tag_animal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tag_animal" ADD CONSTRAINT "tag_animal_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_animal" ADD CONSTRAINT "tag_animal_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
