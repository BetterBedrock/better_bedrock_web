"use client";

import { DetailedProjectDto, ProjectCommentDto } from "@/lib/api";
import { useProject } from "@/providers/project";
import { KeyboardEvent, useRef, useState } from "react";

interface UseCommentsProps {
    detailedProject: DetailedProjectDto;
}

export const useComments = ({ detailedProject }: UseCommentsProps) => {
    const commentInputRef = useRef<HTMLInputElement>(null);
    const { postComment, replyToComment } = useProject();
    const [comments, setComments] = useState<ProjectCommentDto[] | undefined>(undefined);

    const handlePostComment = async () => {
        const content = commentInputRef.current?.value.trim();

        const comment = await postComment(detailedProject.id, content!);
        if (!comment) return;

        if (commentInputRef.current) {
            commentInputRef.current!.value = "";
        }
        setComments((prev) => [...(prev ?? []), comment]);
    };

    const handlePostReply = async (reply: string, parentId: string) => {
        const newReply = await replyToComment(detailedProject.id, parentId, reply);
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

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handlePostComment();
        }
    };
    return { commentInputRef, handleKeyDown, handlePostComment, handlePostReply, comments, setComments };
}