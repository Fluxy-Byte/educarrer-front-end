-- CreateTable
CREATE TABLE "StudyItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "StudyItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudyItem" ADD CONSTRAINT "StudyItem_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
