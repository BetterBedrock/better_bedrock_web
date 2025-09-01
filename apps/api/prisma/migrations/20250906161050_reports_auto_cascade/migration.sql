-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reportedProjectId_reportedProjectDraft_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedProjectId_reportedProjectDraft_fkey" FOREIGN KEY ("reportedProjectId", "reportedProjectDraft") REFERENCES "Project"("id", "draft") ON DELETE CASCADE ON UPDATE CASCADE;
