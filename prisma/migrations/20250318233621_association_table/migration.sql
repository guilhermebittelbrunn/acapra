-- AlterTable
ALTER TABLE "user" ADD COLUMN     "association_id" UUID;

-- CreateTable
CREATE TABLE "association" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "association_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "association_name_key" ON "association"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_association_id_fkey" FOREIGN KEY ("association_id") REFERENCES "association"("id") ON DELETE SET NULL ON UPDATE CASCADE;
