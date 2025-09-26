import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";
import { useRef, useState } from "react";
import { Input } from "~/components/bedrock/input";
import { Button } from "~/components/bedrock/button";
import { ProjectCommentDto } from "~/lib/api";
import { ButtonGroup } from "~/components/button-group/button-group";

import Exit from "~/assets/images/exit.png";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

interface CommentProps {
  comment: ProjectCommentDto;
  user: UserDto | undefined;
  subComments?: CommentProps[]; // For future use with nested comments
  onReply?: (comment: string, parentId: string) => void;
}

export const Comment = ({ comment, subComments, onReply }: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsReplying(false);
    }

    if (event.key === "Enter") {
      setIsReplying(false);
      onReply?.(inputRef.current?.value ?? "", comment.id);
    }
  };

  const getComment = (user: string, content: string, reply: boolean = false) => (
    <>
      <Avatar className={styles.header}>
        <Avatar.Profile name={commentUser} size="medium" />
        <Avatar.Details name={commentUser} at bold className={styles.details}>
          <BedrockText text={content} type="p" color="white" textAlign="start" />
          {user && reply && !isReplying && (
            <BedrockText
              text="Reply"
              type="p"
              textAlign="start"
              extraClassName={styles.reply}
              onClick={() => setIsReplying(true)}
            />
          )}
        </Avatar.Details>

        <div>
          {user && (user?.name !== commentUser || user.admin) && (
            <PopupConfirmation
              description={`Are you sure you want to delete ${user.name === commentUser ? "this comment" : `${commentUser}'s comment`}?`}
              confirmType="red"
              confirmText="Delete"
            >
              <Tooltip text="Delete this comment">
                <SimpleButton
                  transparent
                  onClick={async () => {
                    if (!user) return;
                    await onDelete?.(commentId);
                  }}
                >
                  <img src={Trash} className={styles.more} />
                </SimpleButton>
              </Tooltip>
            </PopupConfirmation>
          )}
          {user && user?.name !== commentUser && (
            <PopupConfirmation
              description={`Are you sure you want to report ${commentUser}'s comment?`}
              confirmText="Report"
            >
              <Tooltip text="Report this comment">
                <SimpleButton
                  transparent
                  onClick={async () => {
                    if (!user) return;
                    const message = `User ${user.name} (${user.id}) has reported ${commentUser}'s (${commentUserId}) comment '${content}' under '${comment.projectId}' project.`;
                    await reportUser(commentUserId, { message });
                  }}
                >
                  <img src={ReportGlyph} className={styles.more} />
                </SimpleButton>
              </Tooltip>
            </PopupConfirmation>
          )}
        </div>
      </div>
      {isReplying && reply && (
        <div className={styles.header}>
          <ButtonGroup>
            <Input
              autoFocus={true}
              onBlur={(e) => e.target.value === "" && setIsReplying(false)}
              ref={inputRef}
              placeholder="Response..."
              onKeyDown={handleKeyDown}
            />
            <Button
              type="green"
              center
              onClick={() => onReply?.(inputRef.current?.value ?? "", comment.id)}
            >
              <BedrockText color="white" type="p" text="Post" />
            </Button>
            <Button type="dark" center onClick={() => setIsReplying(false)}>
              <img alt="Close" src={Exit} className={styles.icon} />
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );

  return (
    <div className={styles.comment}>
      {getComment(comment.author.name, comment.content, true)}
      {subComments?.map((c) => getComment(c.comment.author.name, c.comment.content))}
    </div>
  );
};
