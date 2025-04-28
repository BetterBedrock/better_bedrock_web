import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Download } from "@prisma/client";

@Injectable()
export class DownloadService {
    constructor(private prisma: PrismaService) {}

    async download(
        downloadWhereUniqueInput: Prisma.DownloadWhereUniqueInput,
    ): Promise<Download | null> {
        return this.prisma.download.findUnique({
            where: downloadWhereUniqueInput,
        });
    }

    async downloads(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DownloadWhereUniqueInput;
        where?: Prisma.DownloadWhereInput;
        orderBy?: Prisma.DownloadOrderByWithRelationInput;
    }): Promise<Download[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.download.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createDownload(data: Prisma.DownloadCreateInput): Promise<Download> {
        return this.prisma.download.create({
            data,
        });
    }

    async updateDownload(params: {
        where: Prisma.DownloadWhereUniqueInput;
        data: Prisma.DownloadUpdateInput;
    }): Promise<Download> {
        const { where, data } = params;
        return this.prisma.download.update({
            data,
            where,
        });
    }

    async deleteDownload(where: Prisma.DownloadWhereUniqueInput): Promise<Download> {
        return this.prisma.download.delete({
            where,
        });
    }
}
