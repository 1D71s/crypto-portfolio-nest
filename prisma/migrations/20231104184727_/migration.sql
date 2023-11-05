/*
  Warnings:

  - Added the required column `spentCoin` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "spentCoin" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "spent" SET DATA TYPE DOUBLE PRECISION;
