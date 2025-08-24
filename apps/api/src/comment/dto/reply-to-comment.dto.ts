import { PickType } from "@nestjs/swagger";
import { CommentDto } from "~/comment/dto/comment.dto";

export class ReplyToCommentDto extends PickType(CommentDto, [
    "authorId",
    "content",
    "projectId",
    "parentId",
] as const) {}
