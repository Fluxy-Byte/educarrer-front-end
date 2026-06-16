/*
  Warnings:

  - The `study` column on the `Study` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "study",
ADD COLUMN     "study" TEXT[];
