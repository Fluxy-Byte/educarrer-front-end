/*
  Warnings:

  - You are about to drop the `StudyGapResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudyGapTopic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudyGapResource" DROP CONSTRAINT "StudyGapResource_gapId_fkey";

-- DropForeignKey
ALTER TABLE "StudyGapTopic" DROP CONSTRAINT "StudyGapTopic_gapId_fkey";

-- AlterTable
ALTER TABLE "StudyGap" ADD COLUMN     "resources" TEXT[],
ADD COLUMN     "topics" TEXT[];

-- DropTable
DROP TABLE "StudyGapResource";

-- DropTable
DROP TABLE "StudyGapTopic";
