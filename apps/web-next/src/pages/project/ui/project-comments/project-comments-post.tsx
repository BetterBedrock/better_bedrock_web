"use client";

import { Banner } from "@/shared/ui/banner";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";
import { DetailedProjectDto, UserDto } from "@/shared/lib/openapi";
import { useComments } from "@/pages/project/model/use-comments";

import styles from "./project-comments.module.scss";

interface ProjectCommentsPostProps {
  user: UserDto | undefined;
  detailedProject: DetailedProjectDto;
}

export const ProjectCommentsPost = ({
  user,
  detailedProject,
}: ProjectCommentsPostProps) => {
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
