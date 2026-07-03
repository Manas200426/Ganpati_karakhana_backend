/*
  Warnings:

  - The `role` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[workshopId,email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workshopId,phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workshopId,billNo]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('OWNER', 'ADMIN', 'STAFF');

-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Order_billNo_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "role",
ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'ADMIN';

-- CreateIndex
CREATE INDEX "Admin_workshopId_idx" ON "Admin"("workshopId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_workshopId_email_key" ON "Admin"("workshopId", "email");

-- CreateIndex
CREATE INDEX "Customer_workshopId_idx" ON "Customer"("workshopId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_workshopId_phone_key" ON "Customer"("workshopId", "phone");

-- CreateIndex
CREATE INDEX "MurtiItem_orderId_idx" ON "MurtiItem"("orderId");

-- CreateIndex
CREATE INDEX "MurtiPhoto_murtiItemId_idx" ON "MurtiPhoto"("murtiItemId");

-- CreateIndex
CREATE INDEX "Order_workshopId_idx" ON "Order"("workshopId");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_adminId_idx" ON "Order"("adminId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Order_workshopId_billNo_key" ON "Order"("workshopId", "billNo");

-- CreateIndex
CREATE INDEX "StatusLog_orderId_idx" ON "StatusLog"("orderId");

-- CreateIndex
CREATE INDEX "StatusLog_adminId_idx" ON "StatusLog"("adminId");
