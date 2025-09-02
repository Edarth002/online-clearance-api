-- CreateTable
CREATE TABLE `AcceptedClearance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `requestId` INTEGER NOT NULL,
    `approvedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AcceptedClearance_requestId_key`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcceptedClearance` ADD CONSTRAINT `AcceptedClearance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcceptedClearance` ADD CONSTRAINT `AcceptedClearance_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `ClearanceRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
