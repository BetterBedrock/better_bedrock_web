"use server";

import { CommentsList, CommentsPost, styles } from ".";
import { Card, CardDivider } from "@/_components/card";
import { ReportProvider } from "@/_providers/report";
import { HeaderTitle } from "@/app/project/components/header";
import { DetailedProjectDto } from "@/_lib/api";
import { fetchComments } from "@/_lib/projects/fetch-comments";
import { fetchLoggedUser } from "@/_lib/auth";

interface CommentsProps {
  detailedProject: DetailedProjectDto;
}

export const Comments = async ({ detailedProject }: CommentsProps) => {
  const comments = await fetchComments(detailedProject.id);
  const user = await fetchLoggedUser();
  return (
    <ReportProvider>
      <Card sub>
        <div className={styles.editor}>
          <HeaderTitle title="Comments" />
        </div>
        <CardDivider sub />
        <CommentsPost user={user} detailedProject={detailedProject} />
        <CommentsList comments={comments} user={user} />
      </Card>
    </ReportProvider>
  );
};
