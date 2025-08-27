import { SimpleProjectDto } from "~/project/dto/simple-project.dto";

export class SearchProjectsDto {
    items: SimpleProjectDto[];
    total: number;
    page: number;
    totalPages: number;
}
