/*
  Warnings:

  - You are about to drop the column `customLinkvertise` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MonetizationType" AS ENUM ('linkvertise', 'lootlabs');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customLinkvertise",
ADD COLUMN     "lootlabsSecret" TEXT,
ADD COLUMN     "monetizationType" "MonetizationType" DEFAULT 'linkvertise';
