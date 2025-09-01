import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { ReportProjectDto } from "~/report/dto/report-project.dto";
import { ReportUserDto } from "~/report/dto/report-user.dto";

@Injectable()
export class ReportService {
    constructor(private prismaService: PrismaService) {}

    async reportProject(data: ReportProjectDto) {
        return this.prismaService.report.create({
            data,
        });
    }

    async reportUser(data: ReportUserDto) {
        await this.prismaService.report.deleteMany({});
        return this.prismaService.report.create({
            data,
        });
    }

    async fetchReports() {
        return this.prismaService.report.findMany();
    }

    async resolveReport(id: string) {
        return this.prismaService.report.update({
            where: { id },
            data: { resolved: true, resolvedAt: new Date() },
        });
    }

    async reopenReport(id: string) {
        return this.prismaService.report.update({
            where: { id },
            data: { resolved: false, resolvedAt: null },
        });
    }
}
