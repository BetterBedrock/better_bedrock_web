/*
  Warnings:

  - A unique constraint covering the columns `[id,draft]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `description` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "lastChanged" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "submitted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_draft_key" ON "Project"("id", "draft");
