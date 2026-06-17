/*
  Warnings:

  - You are about to drop the column `study` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "study";

-- CreateTable
CREATE TABLE "StudySection" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyStrength" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "advice" TEXT NOT NULL,

    CONSTRAINT "StudyStrength_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyGap" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "estimatedTime" TEXT NOT NULL,

    CONSTRAINT "StudyGap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyGapTopic" (
    "id" TEXT NOT NULL,
    "gapId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StudyGapTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyGapResource" (
    "id" TEXT NOT NULL,
    "gapId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StudyGapResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "focus" TEXT NOT NULL,
    "goals" TEXT NOT NULL,

    CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudySection" ADD CONSTRAINT "StudySection_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyStrength" ADD CONSTRAINT "StudyStrength_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "StudySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyGap" ADD CONSTRAINT "StudyGap_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "StudySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyGapTopic" ADD CONSTRAINT "StudyGapTopic_gapId_fkey" FOREIGN KEY ("gapId") REFERENCES "StudyGap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyGapResource" ADD CONSTRAINT "StudyGapResource_gapId_fkey" FOREIGN KEY ("gapId") REFERENCES "StudyGap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "StudySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
