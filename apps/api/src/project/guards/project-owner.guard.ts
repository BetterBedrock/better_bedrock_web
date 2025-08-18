import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "~/prisma.service";

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const projectId = req.params.id;

        if (!projectId) {
            throw new BadRequestException("Project ID is required");
        }

        const project = await this.prisma.project.findUnique({
            where: { id_draft: { id: projectId, draft: true } },
        });

        if (!project) {
            throw new BadRequestException("Project not found");
        }

        if (project.userId !== user.id) {
            throw new ForbiddenException("You do not own this project");
        }

        req.project = project;
        return true;
    }
}
