import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PostCommentDto } from "~/comment/dto/post-comment.dto";
import { ReplyToCommentDto } from "~/comment/dto/reply-to-comment.dto";
import { PrismaService } from "~/prisma.service";
import { ProjectService } from "~/project/project.service";

@Injectable()
export class CommentService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly projectService: ProjectService,
    ) {}

    async postComment(data: PostCommentDto) {
        const { authorId, projectId, content } = data;
        const project = await this.projectService.findOne(projectId);

        if (!project) {
            throw new NotFoundException("Project not found");
        }

        return await this.prismaService.comment.create({
            data: { authorId, projectId, projectDraft: false, content },
        });
    }

    async getComments(projectId: string) {
        return await this.prismaService.comment.findMany({
            where: { projectId, projectDraft: false, deleted: false },
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { id: true, name: true } },
                replies: { where: { deleted: false } },
            },
        });
    }

    async deleteComment(commentId: string, userId: string) {
        const comment = await this.prismaService.comment.findUnique({ where: { id: commentId } });

        if (!comment) throw new Error("Comment not found");

        if (comment.authorId !== userId)
            throw new Error("You are not authorized to delete this comment");

        await this.prismaService.comment.update({
            where: { id: commentId },
            data: { deleted: true, deletedAt: new Date() },
        });
    }

    async replyToComment(data: ReplyToCommentDto) {
        const { authorId, projectId, content, parentId } = data;
        const project = await this.projectService.findOne(projectId);

        if (!project) {
            throw new NotFoundException("Project not found");
        }

        if (!parentId) return; // No need to throw error here since it's validated in the controller

        const parentComment = await this.prismaService.comment.findUnique({
            where: { id: parentId, deleted: false },
        });

        if (parentComment?.parentId) {
            throw new BadRequestException("Cannot reply to a reply");
        }

        if (!parentComment) {
            throw new Error("Parent comment not found");
        }

        return await this.prismaService.comment.create({
            data: { authorId, projectId, projectDraft: false, content, parentId },
        });
    }

    async pinComment(commentId: string, userId: string) {
        const comment = await this.prismaService.comment.findUnique({
            where: { id: commentId, deleted: false },
            include: { project: true },
        });

        if (!comment) {
            throw new Error("Comment not found");
        }

        if (comment.project.userId !== userId) {
            throw new Error("You are not authorized to pin this comment");
        }

        await this.prismaService.comment.updateMany({
            where: { projectId: comment.projectId, pinned: true },
            data: { pinned: false },
        });

        return await this.prismaService.comment.update({
            where: { id: commentId },
            data: { pinned: true },
        });
    }

    async unpinComment(commentId: string, userId: string) {
        const comment = await this.prismaService.comment.findUnique({
            where: { id: commentId, deleted: false },
            include: { project: true },
        });

        if (!comment) {
            throw new Error("Comment not found");
        }

        if (comment.project.userId !== userId) {
            throw new Error("You are not authorized to unpin this comment");
        }

        return await this.prismaService.comment.update({
            where: { id: commentId },
            data: { pinned: false },
        });
    }
}
