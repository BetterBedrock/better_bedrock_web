/*
  Warnings:

  - The primary key for the `Download` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Download` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Download" DROP CONSTRAINT "Download_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Download_pkey" PRIMARY KEY ("ipAddress");
