import { PickType } from "@nestjs/swagger";
import { CommentDto } from "~/comment/dto/comment.dto";

export class ReplyToCommentParamsDto extends PickType(CommentDto, [
    "projectId",
    "parentId",
] as const) {}
