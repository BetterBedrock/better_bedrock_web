import { AuthenticatedRequest } from "~/common/types/authenticated-request.type";
import { DetailedProjectDto } from "~/project/dto/detailed-project.dto";

export interface ProjectRequest extends AuthenticatedRequest {
    project: DetailedProjectDto;
}
