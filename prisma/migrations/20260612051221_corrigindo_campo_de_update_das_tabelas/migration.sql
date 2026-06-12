/*
  Warnings:

  - Made the column `updatedAt` on table `Avaliations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Experience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Skill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Study` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Avaliations" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Study" ALTER COLUMN "updatedAt" SET NOT NULL;
