import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Input } from "~/components/bedrock/input";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { ProjectCommentDto } from "~/lib/api";
import { useEffect, useRef, useState } from "react";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";
import { Comment } from "~/components/comment";
import { Banner } from "~/components/bedrock/banner";
import { HeaderTitle } from "~/pages/project/components/header";
import { useAuth } from "~/providers/auth";
import { ReportProvider } from "~/providers/report";

export const Comments = () => {
  const { selectedProject } = useProjectManager();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { throwError } = useNotification();
  const { postComment, replyToComment, getComments, deleteComment } = useProject();
  const { user } = useAuth();
  const [comments, setComments] = useState<ProjectCommentDto[] | undefined>(undefined);

  const fetchComments = async () => {
    if (!selectedProject) return;

    setComments(await getComments(selectedProject.id));
  };

  const handlePostComment = async () => {
    if (!selectedProject) return;

    const content = commentInputRef.current?.value;

    if (!content || content === "") {
      throwError(null, "You need to provide a comment");
    }

    const comment = await postComment(selectedProject.id, content!);
    if (!comment) return;

    if (commentInputRef.current) {
      commentInputRef.current!.value = "";
    }
    setComments((prev) => [...(prev ?? []), comment]);
  };

  const handlePostReply = async (reply: string, parentId: string) => {
    if (!selectedProject) return;

    if (!reply.trim()) {
      throwError(null, "You need to provide a comment");
      return;
    }

    const newReply = await replyToComment(selectedProject.id, parentId, reply);
    if (!newReply) return;

    setComments((prev) =>
      (prev ?? []).map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [...(comment.replies ?? []), newReply], // immutably add reply
            }
          : comment,
      ),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handlePostComment();
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);

      setComments(
        (prev) =>
          (prev ?? [])
            .map((comment) => {
              if (comment.id === commentId) {
                return null;
              }

              const updatedReplies = comment.replies?.filter((reply) => reply.id !== commentId);

              return {
                ...comment,
                replies: updatedReplies,
              };
            })
            .filter(Boolean) as ProjectCommentDto[], // remove nulls
      );
    } catch (error) {
      throwError(error, "Failed to delete comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [selectedProject]);

  return (
    <ReportProvider>
      <Card sub>
        <div className={styles.editor}>
          <HeaderTitle title="Comments" />
        </div>
        <CardDivider sub />

        <div className={styles.editor}>
          {!user ? (
            <Banner
              message="You need to be logged in to comment and rate projects"
              type="neutral"
            />
          ) : (
            <ButtonGroup>
              <Input
                className={styles.input}
                ref={commentInputRef}
                placeholder="Your Comment..."
                onKeyDown={handleKeyDown}
              />
              <Button type="green" onClick={handlePostComment} center>
                <BedrockText text="Post" type="p" color="white" />
              </Button>
            </ButtonGroup>
          )}
        </div>
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
      </Card>
    </ReportProvider>
  );
};
