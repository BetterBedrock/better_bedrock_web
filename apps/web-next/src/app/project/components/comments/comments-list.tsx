import { Banner } from "@/_components/banner";
import { Comment } from "@/_components/comment";
import { ProjectCommentDto, UserDto } from "@/_lib/api";
import { postComment } from "@/_lib/projects/post-comment";
import { deleteComment } from "@/_lib/projects/delete-comment";

import styles from "./comments.module.scss";

interface CommentsListProps {
  comments: ProjectCommentDto[];
  user: UserDto | undefined;
}

export const CommentsList = async ({ comments, user }: CommentsListProps) => (
  <div className={styles.editor}>
    <div className={styles.comments}>
      {comments?.length === 0 && (
        <Banner type="neutral" message="No comments yet" />
      )}
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={postComment}
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
