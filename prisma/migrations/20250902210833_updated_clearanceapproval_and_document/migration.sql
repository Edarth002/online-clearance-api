-- DropForeignKey
ALTER TABLE `clearanceapproval` DROP FOREIGN KEY `ClearanceApproval_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `Document_requestId_fkey`;

-- DropIndex
DROP INDEX `Document_requestId_fkey` ON `document`;

-- AddForeignKey
ALTER TABLE `ClearanceApproval` ADD CONSTRAINT `ClearanceApproval_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ClearanceRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ClearanceRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
