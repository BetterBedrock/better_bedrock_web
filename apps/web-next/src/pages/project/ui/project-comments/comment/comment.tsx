"use client";

import { styles } from ".";
import { Fragment, KeyboardEvent, useRef, useState } from "react";

import Exit from "@/public/images/exit.png";
import clsx from "clsx";

import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";
import Trash from "@/public/images/trash.png";
import { Avatar } from "@/shared/ui/avatar";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { PopupConfirmation } from "@/shared/ui/popup";
import { SimpleButton } from "@/shared/ui/simple-button";
import { Tooltip } from "@/shared/ui/tooltip";
import { ProjectCommentDto, UserDto } from "@/shared/lib/openapi";
import { reportUser } from "@/entities/report";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CommentProps {
  comment: ProjectCommentDto;
  user: UserDto | undefined;
  className?: string;
  subComments?: CommentProps[]; // For future use with nested comments
  onReply?: (projectId: string, parentId: string, comment: string) => void;
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
  const router = useRouter();
  const [isReplying, setIsReplying] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsReplying(false);
    }

    if (event.key === "Enter") {
      setIsReplying(false);
      onReply?.(comment.projectId, comment.id, inputRef.current?.value ?? "");
      router.refresh();
    }
  };

  const getComment = (
    commentId: string,
    commentUserId: string,
    commentUser: string,
    content: string,
    reply: boolean = false,
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
                      router.refresh();
                    }}
                  >
                    <Image
                      unoptimized
                      width={18}
                      height={24}
                      src={Trash.src}
                      className={styles.more}
                      alt="Trash Icon"
                    />
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
                    <Image
                      height={24}
                      width={16}
                      unoptimized
                      alt="Report Glyph Button"
                      src={ReportGlyph.src}
                      className={styles.more}
                    />
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
                sub
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
                  onReply?.(
                    comment.projectId,
                    comment.id,
                    inputRef.current?.value ?? "",
                  );
                  setIsReplying(false);
                  router.refresh();
                }}
              >
                <BedrockText color="white" type="p" text="Post" />
              </Button>
              <Button type="dark" center onClick={() => setIsReplying(false)}>
                <Image
                  width={25}
                  height={25}
                  unoptimized
                  alt="Close Icon"
                  src={Exit.src}
                  className={styles.icon}
                />
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Card sub className={styles.card}>
      <div className={clsx(styles.comment, className && className)}>
        {getComment(
          comment.id,
          comment.author.id,
          comment.author.name,
          comment.content,
          true,
        )}
        {subComments?.map((c) =>
          getComment(
            c.comment.id,
            c.comment.author.id,
            c.comment.author.name,
            c.comment.content,
          ),
        )}
      </div>
    </Card>
  );
};
