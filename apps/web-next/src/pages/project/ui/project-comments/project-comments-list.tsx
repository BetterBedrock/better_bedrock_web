"use client";

import { Banner } from "@/shared/ui/banner";
import { Comment } from "./comment";
import {
  ProjectCommentDto,
  ProjectCommentsListDto,
  UserDto,
} from "@/shared/lib/openapi";
import { deleteComment, fetchComments } from "@/entities/project";

import styles from "./project-comments.module.scss";
import { replyToComment } from "@/entities/project";
import { InfiniteList } from "@/shared/ui/infinite-list";

interface ProjectCommentsListProps {
  id: string;
  commentsData: ProjectCommentsListDto;
  user: UserDto | undefined;
}

export const ProjectCommentsList = ({
  id,
  commentsData,
  user,
}: ProjectCommentsListProps) => {
  const loadMoreComments = async (page: number) =>
    (await fetchComments(id, page)).comments;

  const onRender = (comment: ProjectCommentDto) => (
    <Comment
      key={comment.id}
      comment={comment}
      onReply={replyToComment}
      user={user}
      onDelete={deleteComment}
      subComments={
        comment.replies?.map((reply) => ({
          comment: reply,
          user: undefined,
        })) ?? []
      }
    />
  );

  return (
    <div className={styles.comments}>
      <InfiniteList
        defaultData={commentsData.comments}
        onLoad={loadMoreComments}
        onRender={onRender}
        maxPages={commentsData.maxPages}
      />
      {commentsData.comments?.length === 0 && (
        <Banner variant="neutral" message="No comments yet" />
      )}
    </div>
  );
};
