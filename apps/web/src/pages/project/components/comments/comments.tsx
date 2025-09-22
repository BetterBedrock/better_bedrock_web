import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Input } from "~/components/bedrock/input";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { ProjectCommentDto } from "~/lib/api";
import { useRef, useState } from "react";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";
import { Comment } from "~/components/comment";
import { Banner } from "~/components/bedrock/banner";
import { HeaderTitle } from "~/pages/project/components/header";

export const Comments = () => {
  const { selectedProject } = useProjectManager();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { throwError } = useNotification();
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

  useEffect(() => {
    fetchComments();
  }, [selectedProject]);

  return (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Comments" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
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
      </div>
      <div className={styles.editor}>
        <div className={styles.comments}>
          {comments?.length === 0 && <Banner type="neutral" message="No comments yet" />}
          {comments?.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              onReply={handlePostReply}
              subComments={
                comment.replies?.map((reply) => ({
                  comment: reply,
                })) ?? []
              }
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
