/*
  Warnings:

  - Added the required column `original_name` to the `picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "picture" ADD COLUMN     "original_name" TEXT NOT NULL;
