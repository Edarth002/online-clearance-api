/*
  Warnings:

  - A unique constraint covering the columns `[requestId,officerId]` on the table `ClearanceApproval` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ClearanceApproval_requestId_officerId_key` ON `ClearanceApproval`(`requestId`, `officerId`);
