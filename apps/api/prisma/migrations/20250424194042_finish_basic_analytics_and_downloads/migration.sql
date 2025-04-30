/*
  Warnings:

  - The primary key for the `Download` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `ipAddress` to the `Download` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Download" DROP CONSTRAINT "Download_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Download_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Download_id_seq";

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "totalDownloads" INTEGER NOT NULL DEFAULT 0,
    "verifiedDownloads" INTEGER NOT NULL DEFAULT 0,
    "downloadsToday" INTEGER NOT NULL DEFAULT 0,
    "downloadsThisWeek" INTEGER NOT NULL DEFAULT 0,
    "fileCounts" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
