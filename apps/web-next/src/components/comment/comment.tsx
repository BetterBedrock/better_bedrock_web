"use client";

import { styles } from ".";
import { Fragment, KeyboardEvent, useRef, useState } from "react";

import Exit from "@/public/images/exit.png";
import clsx from "clsx";

import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";
import Trash from "@/public/images/trash.png";
import { Avatar } from "@/components/avatar";
import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group/button-group";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { PopupConfirmation } from "@/components/popup/popup-confirmation";
import { SimpleButton } from "@/components/simple-button";
import { Tooltip } from "@/components/tooltip";
import { ProjectCommentDto, UserDto } from "@/lib/api";
import { reportUser } from "@/lib/report/report-user";

interface CommentProps {
  comment: ProjectCommentDto;
  user: UserDto | undefined;
  className?: string;
  subComments?: CommentProps[]; // For future use with nested comments
  onReply?: (comment: string, parentId: string) => void;
  onDelete?: (commentId: string) => Promise<void>;
}

export const Comment = ({
  comment,
  subComments,
  onReply,
  onDelete,
  user,
  className,
}: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsReplying(false);
    }

    if (event.key === "Enter") {
      setIsReplying(false);
      onReply?.(inputRef.current?.value ?? "", comment.id);
    }
  };

  const getComment = (
    commentId: string,
    commentUserId: string,
    commentUser: string,
    content: string,
    reply: boolean = false
  ) => {
    const canReport = user && user?.name !== commentUser;
    const canDelete = user?.name == commentUser || user?.admin;
    return (
      <Fragment key={commentId}>
        <Avatar className={styles.header}>
          <Avatar.Profile name={commentUser} size="medium" />
          <Avatar.Details name={commentUser} at bold className={styles.details}>
            <BedrockText
              text={content}
              type="p"
              color="white"
              textAlign="start"
              extraClassName={styles.wrap}
            />
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

          <div className={styles.icons}>
            {canDelete && (
              <PopupConfirmation
                description={`Are you sure you want to delete ${user?.name === commentUser ? "this comment" : `${commentUser}'s comment`}?`}
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
                    <img src={Trash.src} className={styles.more} />
                  </SimpleButton>
                </Tooltip>
              </PopupConfirmation>
            )}
            {canReport && (
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
                    <img src={ReportGlyph.src} className={styles.more} />
                  </SimpleButton>
                </Tooltip>
              </PopupConfirmation>
            )}
          </div>
        </Avatar>
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
                onClick={() => {
                  onReply?.(inputRef.current?.value ?? "", comment.id);
                  setIsReplying(false);
                }}
              >
                <BedrockText color="white" type="p" text="Post" />
              </Button>
              <Button type="dark" center onClick={() => setIsReplying(false)}>
                <img alt="Close" src={Exit.src} className={styles.icon} />
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Card className={styles.card}>
      <div className={clsx(styles.comment, className && className)}>
        {getComment(
          comment.id,
          comment.author.id,
          comment.author.name,
          comment.content,
          true
        )}
        {subComments?.map((c) =>
          getComment(
            c.comment.id,
            c.comment.author.id,
            c.comment.author.name,
            c.comment.content
          )
        )}
      </div>
    </Card>
  );
};
