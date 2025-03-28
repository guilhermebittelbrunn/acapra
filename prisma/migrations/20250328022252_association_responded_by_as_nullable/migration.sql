-- DropForeignKey
ALTER TABLE "adoption" DROP CONSTRAINT "adoption_responded_by_fkey";

-- AlterTable
ALTER TABLE "adoption" ALTER COLUMN "responded_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "adoption" ADD CONSTRAINT "adoption_responded_by_fkey" FOREIGN KEY ("responded_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
