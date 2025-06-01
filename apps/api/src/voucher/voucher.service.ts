import { Injectable } from "@nestjs/common";
// import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    // async createVoucher(data: Prisma.VoucherCreateInput) {
    //     return this.prisma.analytics.create({
    //         data,
    //     });
    // }

    // async updateVoucher(data: Prisma.VoucherUpdateInput) {
    //     return this.prisma.analytics.update({
    //         where: {
    //             id: "global",
    //         },
    //         data: data,
    //     });
    // }
}
