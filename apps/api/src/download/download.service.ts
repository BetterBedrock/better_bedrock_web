import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class DownloadService {
    constructor(private prismaService: PrismaService) {}

    async download(downloadWhereUniqueInput: Prisma.DownloadWhereUniqueInput) {
        return this.prismaService.download.findUnique({
            where: downloadWhereUniqueInput,
        });
    }

    async downloads(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DownloadWhereUniqueInput;
        where?: Prisma.DownloadWhereInput;
        orderBy?: Prisma.DownloadOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.download.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createDownload(data: Prisma.DownloadCreateInput) {
        return this.prismaService.download.create({
            data,
        });
    }

    async updateDownload(params: {
        where: Prisma.DownloadWhereUniqueInput;
        data: Prisma.DownloadUpdateInput;
    }) {
        const { where, data } = params;
        return this.prismaService.download.update({
            data,
            where,
        });
    }

    async deleteDownload(where: Prisma.DownloadWhereUniqueInput) {
        return this.prismaService.download.delete({
            where,
        });
    }
}
