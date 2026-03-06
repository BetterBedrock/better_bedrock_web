"use client";

import { useNotification } from "@/app/providers/notification";
import { postComment } from "@/entities/project";
import { replyToComment } from "@/entities/project";
import { DetailedProjectDto, ProjectCommentDto } from "@/shared/lib/openapi";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";

interface UseCommentsProps {
    detailedProject: DetailedProjectDto;
}

export const useComments = ({ detailedProject }: UseCommentsProps) => {
    const router = useRouter();
    const { throwError } = useNotification();

    const commentInputRef = useRef<HTMLInputElement>(null);
    const [comments, setComments] = useState<ProjectCommentDto[] | undefined>(
        undefined,
    );

    const handlePostComment = async () => {
        const content = commentInputRef.current?.value.trim();

        const { data, error } = await postComment(detailedProject.id, content!);
        if (error || !data) {
            if (error)
                throwError(null, error);
            return;
        }

        if (commentInputRef.current) {
            commentInputRef.current!.value = "";
        }

        router.refresh();
    };

    const handlePostReply = async (reply: string, parentId: string) => {
        const newReply = await replyToComment(detailedProject.id, parentId, reply);
        if (!newReply) return;

        router.refresh();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handlePostComment();
        }
    };
    return {
        commentInputRef,
        handleKeyDown,
        handlePostComment,
        handlePostReply,
        comments,
        setComments,
    };
};
