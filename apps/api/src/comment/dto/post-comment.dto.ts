import { PickType } from "@nestjs/swagger";
import { CommentDto } from "~/comment/dto/comment.dto";

export class PostCommentDto extends PickType(CommentDto, [
    "authorId",
    "content",
    "projectId",
] as const) {}
