import { ProjectDto } from "~/project/dto/project.dto";
import { ProjectRatingDto } from "~/rating/dto/project-rating.dto";
import { ProjectCreatorDto } from "~/user/dto/project-creator.dto";

export class DetailedProjectDto extends ProjectDto {
    user: ProjectCreatorDto;

    rating: ProjectRatingDto;
}
