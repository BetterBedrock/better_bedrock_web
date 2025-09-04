import { ForbiddenException, GoneException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { ActivateVoucherDto } from "~/checkout/dto/activate-voucher.dto";
import { PrismaService } from "~/prisma.service";
import { obscureEmail } from "~/utils/string";

@Injectable()
export class VoucherService {
    constructor(private prismaService: PrismaService) {}

    async createVoucher(data: Prisma.VoucherCreateInput) {
        return this.prismaService.voucher.create({
            data,
        });
    }

    async getVoucher(where: Prisma.VoucherWhereUniqueInput) {
        return this.prismaService.voucher.findFirst({
            where: where,
        });
    }

    async activate(query: ActivateVoucherDto) {
        const voucher = await this.getVoucher({
            checkoutId: query.checkoutId == "" ? undefined : query.checkoutId,
            code: query.code,
        });
        if (!voucher) {
            throw new NotFoundException("Voucher not found");
        }

        if (voucher.blocked) {
            throw new ForbiddenException("Voucher is blocked");
        }

        if (dayjs(voucher.expiresAt).isBefore(new Date())) {
            throw new GoneException("Voucher has expired");
        }

        if (voucher.maxDownloads <= voucher.downloadCount) {
            throw new GoneException("Voucher has been used");
        }

        voucher.email = obscureEmail(voucher.email);
        return voucher;
    }

    async getVouchers() {
        return this.prismaService.voucher.findMany();
    }

    async updateVoucher(params: {
        where: Prisma.VoucherWhereUniqueInput;
        data: Prisma.VoucherUpdateInput;
    }) {
        const { where, data } = params;
        return this.prismaService.voucher.update({
            data,
            where,
        });
    }

    async findByCheckoutId(checkoutId: string) {
        return this.prismaService.voucher.findFirst({
            where: { checkoutId },
        });
    }

    generateCode(length = 8): string {
        return randomBytes(Math.ceil(length / 2))
            .toString("hex") // hex = 0-9a-f
            .slice(0, length)
            .toUpperCase();
    }
}
