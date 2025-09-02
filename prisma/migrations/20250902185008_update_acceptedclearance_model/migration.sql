-- DropForeignKey
ALTER TABLE `acceptedclearance` DROP FOREIGN KEY `AcceptedClearance_requestId_fkey`;

-- AddForeignKey
ALTER TABLE `AcceptedClearance` ADD CONSTRAINT `AcceptedClearance_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ClearanceRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
