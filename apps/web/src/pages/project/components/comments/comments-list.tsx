import { Banner } from "~/components/bedrock/banner";
import { Comment } from "~/components/comment";
import { useAuth } from "~/providers/auth";

import { styles, useComments } from ".";

export const CommentsList = () => {
  const { comments, handlePostReply, handleDeleteComment } = useComments();
  const { user } = useAuth();

  return (
    <div className={styles.editor}>
      <div className={styles.comments}>
        {comments?.length === 0 && <Banner type="neutral" message="No comments yet" />}
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handlePostReply}
            user={user}
            onDelete={handleDeleteComment}
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
};
