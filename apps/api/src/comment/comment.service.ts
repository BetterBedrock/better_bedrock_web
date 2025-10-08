import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { PostCommentDto } from "~/comment/dto/post-comment.dto";
import { ReplyToCommentDto } from "~/comment/dto/reply-to-comment.dto";
import { PrismaService } from "~/prisma.service";
import { ProjectService } from "~/project/project.service";
import { UserDto } from "~/user/dto/user.dto";

const commentInclude = {
    author: { select: { id: true, name: true } },
    replies: {
        where: { deleted: false },
        orderBy: { createdAt: "asc" },
        include: {
            author: { select: { id: true, name: true } },
        },
    },
} as const;

@Injectable()
export class CommentService {
    constructor(
        private prismaService: PrismaService,
        private projectService: ProjectService,
    ) {}

    async postComment(data: PostCommentDto) {
        const { authorId, projectId, content } = data;
        const project = await this.projectService.findOne(projectId);

        if (!project) {
            throw new NotFoundException("Project not found");
        }

        return this.prismaService.comment.create({
            data: { authorId, projectId, projectDraft: false, content },
            include: commentInclude,
        });
    }

    async getComments(projectId: string) {
        return this.prismaService.comment.findMany({
            where: { projectId, projectDraft: false, deleted: false, parentId: null },
            orderBy: { createdAt: "desc" },
            include: commentInclude,
        });
    }

    async deleteComment(commentId: string, user: UserDto) {
        const comment = await this.prismaService.comment.findUnique({ where: { id: commentId } });

        if (!comment) throw new NotFoundException("Comment not found");

        if (comment.authorId !== user.id && !user.admin) {
            throw new UnauthorizedException("You are not authorized to delete this comment");
        }

        await this.prismaService.comment.update({
            where: { id: commentId },
            data: { deleted: true, deletedAt: new Date() },
        });
    }

    async replyToComment(data: ReplyToCommentDto) {
        const { authorId, projectId, content, parentId } = data;
        const project = await this.projectService.findOne(projectId);

        if (!project || !parentId) {
            throw new NotFoundException("Project not found");
        }

        const parentComment = await this.prismaService.comment.findUnique({
            where: { id: parentId, deleted: false },
        });

        if (parentComment?.parentId) {
            throw new BadRequestException("Cannot reply to a reply");
        }

        if (!parentComment) {
            throw new NotFoundException("Parent comment not found");
        }

        return this.prismaService.comment.create({
            data: { authorId, projectId, projectDraft: false, content, parentId },
            include: commentInclude,
        });
    }

    async pinComment(commentId: string, userId: string) {
        const comment = await this.prismaService.comment.findUnique({
            where: { id: commentId, deleted: false },
            include: { project: true },
        });

        if (!comment) {
            throw new NotFoundException("Comment not found");
        }

        if (comment.project.userId !== userId) {
            throw new UnauthorizedException("You are not authorized to pin this comment");
        }

        await this.prismaService.comment.updateMany({
            where: { projectId: comment.projectId, pinned: true },
            data: { pinned: false },
        });

        return this.prismaService.comment.update({
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
            throw new NotFoundException("Comment not found");
        }

        if (comment.project.userId !== userId) {
            throw new UnauthorizedException("You are not authorized to unpin this comment");
        }

        return this.prismaService.comment.update({
            where: { id: commentId },
            data: { pinned: false },
        });
    }
}
