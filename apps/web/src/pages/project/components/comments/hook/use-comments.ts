import { KeyboardEvent, useRef, useState } from "react";
import { ProjectCommentDto } from "~/lib/api";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";

export const useComments = () => {
    const { selectedProject } = useProjectManager();
    const commentInputRef = useRef<HTMLInputElement>(null);
    const { throwError } = useNotification();
    const { postComment, replyToComment, getComments, deleteComment } = useProject();
    const [comments, setComments] = useState<ProjectCommentDto[] | undefined>(undefined);

    const fetchComments = async () => {
        if (!selectedProject) return;

        setComments(await getComments(selectedProject.id));
    };

    const handlePostComment = async () => {
        if (!selectedProject) return;

        const content = commentInputRef.current?.value.trim();

        const comment = await postComment(selectedProject.id, content!);
        if (!comment) return;

        if (commentInputRef.current) {
            commentInputRef.current!.value = "";
        }
        setComments((prev) => [...(prev ?? []), comment]);
    };

    const handlePostReply = async (reply: string, parentId: string) => {
        if (!selectedProject) return;

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

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handlePostComment();
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            if (!await deleteComment(commentId)) return;

            setComments(
                (prev) =>
                    (prev ?? [])
                        .map((comment) => {
                            if (comment.id === commentId) {
                                return null;
                            }

                            const updatedReplies = comment.replies?.filter((reply) => reply.id !== commentId);

                            return {
                                ...comment,
                                replies: updatedReplies,
                            };
                        })
                        .filter(Boolean) as ProjectCommentDto[], // remove nulls
            );
        } catch (error) {
            throwError(error, "Failed to delete comment");
        }
    };
    return { commentInputRef, selectedProject, handleDeleteComment, handleKeyDown, handlePostComment, handlePostReply, fetchComments, comments, setComments };
}