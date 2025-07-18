/*
  Warnings:

  - Added the required column `matricNumber` to the `ClearanceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clearancerequest` ADD COLUMN `matricNumber` VARCHAR(191) NOT NULL;
