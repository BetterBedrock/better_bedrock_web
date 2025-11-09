import { Banner } from "@/_components/banner";
import { styles } from ".";
import { Comment } from "@/_components/comment";
import { ProjectCommentDto, UserDto } from "@/_lib/api";
import { fetchLoggedUser } from "@/_lib/auth";
import { postComment } from "@/_lib/projects/post-comment";
import { deleteComment } from "@/_lib/projects/delete-comment";

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
