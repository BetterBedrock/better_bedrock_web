"use client";

import { Banner } from "@/_components/banner";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Input } from "@/_components/input";
import { DetailedProjectDto, UserDto } from "@/_lib/api";
import { useComments } from "@/app/(projects)/project/components/comments/hook/use-comments";

import styles from "./comments.module.scss";

interface CommentsPostProps {
  user: UserDto | undefined;
  detailedProject: DetailedProjectDto;
}

export const CommentsPost = ({ user, detailedProject }: CommentsPostProps) => {
  const { handleKeyDown, handlePostComment, commentInputRef } = useComments({
    detailedProject,
  });

  return (
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
  );
};
