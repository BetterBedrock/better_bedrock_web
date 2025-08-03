/*
  Warnings:

  - The primary key for the `Analytics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `downloadsThisWeek` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `downloadsToday` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `fileCounts` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `totalDownloads` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedDownloads` on the `Analytics` table. All the data in the column will be lost.
  - The `id` column on the `Analytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name,date]` on the table `Analytics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnalyticsType" AS ENUM ('file', 'general');

-- AlterTable
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_pkey",
DROP COLUMN "downloadsThisWeek",
DROP COLUMN "downloadsToday",
DROP COLUMN "fileCounts",
DROP COLUMN "totalDownloads",
DROP COLUMN "verifiedDownloads",
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" "AnalyticsType" NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_name_date_key" ON "Analytics"("name", "date");
