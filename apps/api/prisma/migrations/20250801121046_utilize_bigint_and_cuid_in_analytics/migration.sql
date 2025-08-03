/*
  Warnings:

  - The primary key for the `Analytics` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_pkey",
ALTER COLUMN "value" SET DATA TYPE BIGINT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Analytics_id_seq";
