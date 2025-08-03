/*
  Warnings:

  - You are about to alter the column `value` on the `Analytics` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "value" SET DATA TYPE INTEGER;
