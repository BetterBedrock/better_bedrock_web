import { IsNumber } from "class-validator";
import { ProjectRatingDto } from "~/rating/dto/project-rating.dto";
import { ProjectCreatorDto } from "~/user/dto/project-creator.dto";

export class ProjectDetailsDto {
    user: ProjectCreatorDto;

    @IsNumber()
    rating: ProjectRatingDto;
}
