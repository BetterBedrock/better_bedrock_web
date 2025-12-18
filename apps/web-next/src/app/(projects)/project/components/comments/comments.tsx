"use server";

import { Card, CardDivider } from "@/_components/card";
import { ReportProvider } from "@/_providers/report";
import { DetailedProjectDto } from "@/_lib/api";
import { fetchComments } from "@/_lib/projects/fetch-comments";
import { fetchLoggedUser } from "@/_lib/auth";
import { HeaderTitle } from "@/app/(projects)/project/components/header/header-title";
import { CommentsList } from "@/app/(projects)/project/components/comments/comments-list";
import { CommentsPost } from "@/app/(projects)/project/components/comments/comments-post";

import styles from "./comments.module.scss";

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
