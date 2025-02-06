/*
  Warnings:

  - Added the required column `value` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isText" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "value" TEXT NOT NULL;
