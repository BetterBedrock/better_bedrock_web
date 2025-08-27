import { CommentDto } from "~/comment/dto/comment.dto";

export class ProjectCommentDto extends CommentDto {
    author: {
        id: string;
        name: string;
    };
    replies?: ProjectCommentDto[];
}
