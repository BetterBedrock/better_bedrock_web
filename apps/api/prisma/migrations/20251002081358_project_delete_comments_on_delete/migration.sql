-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_projectId_projectDraft_fkey";

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_projectId_projectDraft_fkey" FOREIGN KEY ("projectId", "projectDraft") REFERENCES "public"."Project"("id", "draft") ON DELETE CASCADE ON UPDATE CASCADE;
