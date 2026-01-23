import { Banner } from "@/shared/ui/banner";
import { Comment } from "./comment";
import { ProjectCommentDto, UserDto } from "@/shared/lib/openapi";
import { deleteComment } from "@/entities/project";

import styles from "./project-comments.module.scss";
import { replyToComment } from "@/entities/project";

interface ProjectCommentsListProps {
  comments: ProjectCommentDto[];
  user: UserDto | undefined;
}

export const ProjectCommentsList = async ({
  comments,
  user,
}: ProjectCommentsListProps) => (
  <div className={styles.editor}>
    <div className={styles.comments}>
      {comments?.length === 0 && (
        <Banner type="neutral" message="No comments yet" />
      )}
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={replyToComment}
          user={user}
          onDelete={deleteComment}
          subComments={
            comment.replies?.map((reply) => ({
              comment: reply,
              user: undefined,
            })) ?? []
          }
        />
      ))}
    </div>
  </div>
);
