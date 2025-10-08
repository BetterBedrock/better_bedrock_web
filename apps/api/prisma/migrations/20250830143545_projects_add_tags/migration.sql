/*
  Warnings:

  - You are about to drop the column `tags` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectDraft" BOOLEAN NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_projectId_projectDraft_fkey" FOREIGN KEY ("projectId", "projectDraft") REFERENCES "Project"("id", "draft") ON DELETE RESTRICT ON UPDATE CASCADE;
