/*
  Warnings:

  - Added the required column `specie_base_id` to the `specie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "specie" ADD COLUMN     "specie_base_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "specieBase" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "specieBase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specieBase_name_key" ON "specieBase"("name");

-- AddForeignKey
ALTER TABLE "specie" ADD CONSTRAINT "specie_specie_base_id_fkey" FOREIGN KEY ("specie_base_id") REFERENCES "specieBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
