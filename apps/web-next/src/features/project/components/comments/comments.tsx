import { Card, CardDivider } from "@/components/card";
import { DetailedProjectDto } from "@/lib/api";
import { fetchComments } from "@/features/project/server/fetch-comments";
import { fetchLoggedUser } from "@/lib/auth";
import { HeaderTitle } from "@/features/project/components/header/header-title";
import { CommentsList } from "@/features/project/components/comments/comments-list";
import { CommentsPost } from "@/features/project/components/comments/comments-post";

import styles from "./comments.module.scss";

interface CommentsProps {
  detailedProject: DetailedProjectDto;
}

export const Comments = async ({ detailedProject }: CommentsProps) => {
  const comments = await fetchComments(detailedProject.id);
  const user = await fetchLoggedUser();
  return (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Comments" />
      </div>
      <CardDivider sub />
      <CommentsPost user={user} detailedProject={detailedProject} />
      <CommentsList comments={comments} user={user} />
    </Card>
  );
};
