/*
  Warnings:

  - You are about to drop the `StudyItem` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `study` on the `Study` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "StudyItem" DROP CONSTRAINT "StudyItem_studyId_fkey";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "study",
ADD COLUMN     "study" JSONB NOT NULL;

-- DropTable
DROP TABLE "StudyItem";
