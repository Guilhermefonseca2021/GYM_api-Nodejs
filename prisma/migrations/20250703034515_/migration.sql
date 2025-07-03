/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "updatedAt",
ADD COLUMN     "phone" TEXT;
