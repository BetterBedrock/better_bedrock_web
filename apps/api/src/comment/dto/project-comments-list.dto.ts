import { IsNumber } from "class-validator";
import { ProjectCommentDto } from "~/comment/dto/project-comment.dto";

export class ProjectCommentsListDto {
    comments: ProjectCommentDto[];

    @IsNumber()
    page: number;

    @IsNumber()
    maxPages: number;
}
