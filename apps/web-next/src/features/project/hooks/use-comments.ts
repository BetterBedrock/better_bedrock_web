"use client";

import { postComment } from "@/features/project/server/post-comment";
import { replyToComment } from "@/features/project/server/reply-to-comment";
import { DetailedProjectDto, ProjectCommentDto } from "@/lib/api";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";

interface UseCommentsProps {
    detailedProject: DetailedProjectDto;
}

export const useComments = ({ detailedProject }: UseCommentsProps) => {
    const router = useRouter();

    const commentInputRef = useRef<HTMLInputElement>(null);
    const [comments, setComments] = useState<ProjectCommentDto[] | undefined>(undefined);

    const handlePostComment = async () => {
        const content = commentInputRef.current?.value.trim();

        const comment = await postComment(detailedProject.id, content!);
        if (!comment) return;

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
    return { commentInputRef, handleKeyDown, handlePostComment, handlePostReply, comments, setComments };
}