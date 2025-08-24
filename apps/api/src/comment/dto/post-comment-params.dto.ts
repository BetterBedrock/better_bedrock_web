import { PickType } from "@nestjs/swagger";
import { CommentDto } from "~/comment/dto/comment.dto";

export class PostCommentParamsDto extends PickType(CommentDto, ["content"] as const) {}
