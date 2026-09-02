/*
  Warnings:

  - You are about to drop the column `token` on the `ResetPassWord` table. All the data in the column will be lost.
  - Added the required column `tokenToReset` to the `ResetPassWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResetPassWord" DROP COLUMN "token",
ADD COLUMN     "tokenToReset" TEXT NOT NULL;
