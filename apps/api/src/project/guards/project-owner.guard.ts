import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { ProjectRequest } from "~/common/types/project-request.type";
import { PrismaService } from "~/prisma.service";
import { projectCreatorInclude, projectTagsInclude } from "~/project/project.service";
import { RatingService } from "~/rating/rating.service";

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly ratingService: RatingService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<ProjectRequest>();
        const { user, params } = req;
        const projectId = params?.id;

        if (!projectId || typeof projectId !== "string")
            throw new BadRequestException("Project ID is required");

        const project = await this.prismaService.project.findUnique({
            where: { id_draft: { id: projectId, draft: true } },
            include: { ...projectCreatorInclude, ...projectTagsInclude },
        });

        if (!project) throw new NotFoundException("Project not found");
        if (project.userId !== user.id && !user.admin) {
            throw new ForbiddenException("You do not own this project");
        }

        const [projectRating, userRating] = await Promise.all([
            this.ratingService.getProjectRating(project.id),
            this.ratingService.getProfileRating(project.userId),
        ]);

        req.project = {
            ...project,
            rating: projectRating,
            user: { ...project.user, rating: userRating.average },
        };

        return true;
    }
}
