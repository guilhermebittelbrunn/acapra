/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `association` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "association" ADD COLUMN     "address_id" UUID;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address_id" UUID;

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "street" TEXT NOT NULL,
    "complement" TEXT,
    "address_number" CHAR(10) NOT NULL,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" CHAR(2) NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'BR',
    "cep" CHAR(8),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "association_address_id_key" ON "association"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_address_id_key" ON "user"("address_id");

-- AddForeignKey
ALTER TABLE "association" ADD CONSTRAINT "association_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
