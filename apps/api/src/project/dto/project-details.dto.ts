import { ProjectRatingDto } from "~/rating/dto/project-rating.dto";
import { ProjectCreatorDto } from "~/user/dto/project-creator.dto";

export class ProjectDetailsDto {
    user: ProjectCreatorDto;
    rating: ProjectRatingDto;
}
