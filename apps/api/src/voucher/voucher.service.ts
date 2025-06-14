import { Injectable } from "@nestjs/common";
import { Prisma, Voucher } from "@prisma/client";
import { randomBytes } from "crypto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class VoucherService {
    constructor(private prisma: PrismaService) {}

    async createVoucher(data: Prisma.VoucherCreateInput) {
        return await this.prisma.voucher.create({
            data,
        });
    }

    async getVoucher(where: Prisma.VoucherWhereUniqueInput) {
        return await this.prisma.voucher.findUnique({
            where: where,
        });
    }

    async updateVoucher(params: {
        where: Prisma.VoucherWhereUniqueInput;
        data: Prisma.VoucherUpdateInput;
    }): Promise<Voucher> {
        const { where, data } = params;
        return await this.prisma.voucher.update({
            data,
            where,
        });
    }
    generateCode(length = 8): string {
        return randomBytes(Math.ceil(length / 2))
            .toString("hex") // hex = 0-9a-f
            .slice(0, length)
            .toUpperCase();
    }
}
