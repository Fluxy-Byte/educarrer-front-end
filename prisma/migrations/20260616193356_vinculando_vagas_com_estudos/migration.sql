-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "vacancyId" TEXT NOT NULL DEFAULT 'Teste';

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
