import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { ProjectRatingDto } from "~/rating/dto/project-rating.dto";
import { RateProjectDto } from "~/rating/dto/rate-project.dto";
import { UserRatingDto } from "~/rating/dto/user-rating.dto";

@Injectable()
export class RatingService {
    constructor(private readonly prismaService: PrismaService) {}

    async rateProject(data: RateProjectDto) {
        const { userId, projectId, rating } = data;

        await this.prismaService.rating.upsert({
            where: { userId_projectId: { userId, projectId } },
            update: { rating },
            create: {
                userId,
                projectId,
                projectDraft: false,
                rating,
            },
        });

        return await this.getProjectRating(projectId);
    }

    async getProjectRating(projectId: string): Promise<ProjectRatingDto> {
        const agg = await this.prismaService.rating.aggregate({
            where: { projectId, projectDraft: false },
            _avg: { rating: true },
            _count: { _all: true },
        });

        const count = agg._count._all ?? 0;
        const average = count === 0 ? 0 : (agg._avg.rating ?? 0);
        return { average, count };
    }

    async getUserRating(userId: string, projectId: string) {
        const rating = await this.prismaService.rating.findFirst({
            where: { userId, projectId, projectDraft: false },
        });

        return rating ? rating.rating : null;
    }

    async deleteUsersRating(userId: string, projectId: string) {
        await this.prismaService.rating.deleteMany({
            where: { userId, projectId, projectDraft: false },
        });

        return await this.getProjectRating(projectId);
    }

    async getProfileRating(userId: string): Promise<UserRatingDto> {
        const agg = await this.prismaService.rating.aggregate({
            where: { userId, projectDraft: false },
            _avg: { rating: true },
            _count: { _all: true },
        });

        const count = agg._count._all ?? 0;
        const average = count === 0 ? 0 : (agg._avg.rating ?? 0);
        return { average, count };
    }
}
