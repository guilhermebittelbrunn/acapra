/*
  Warnings:

  - You are about to drop the column `breed_id` on the `animal` table. All the data in the column will be lost.
  - You are about to drop the `breed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `breed` to the `animal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "animal" DROP CONSTRAINT "animal_breed_id_fkey";

-- DropForeignKey
ALTER TABLE "breed" DROP CONSTRAINT "breed_specie_id_fkey";

-- AlterTable
ALTER TABLE "animal" DROP COLUMN "breed_id",
ADD COLUMN     "breed" TEXT NOT NULL;

-- DropTable
DROP TABLE "breed";

-- CreateTable
CREATE TABLE "tag" (
    "id" UUID NOT NULL,
    "association_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
