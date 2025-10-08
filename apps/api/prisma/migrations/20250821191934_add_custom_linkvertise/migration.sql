-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customLinkvertise" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "linkvertiseId" TEXT,
ADD COLUMN     "linkvertiseSecret" TEXT;
