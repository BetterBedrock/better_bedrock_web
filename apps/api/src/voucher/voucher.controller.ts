import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { CreateVoucher } from "~/voucher/dto/create-voucher.dto";
import { UpdateVoucher } from "~/voucher/dto/update-voucher.dto";
import { VoucherDto } from "~/voucher/dto/voucher.dto";
import { VoucherService } from "~/voucher/voucher.service";

@Controller("voucher")
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
export class VoucherController {
    constructor(private voucherService: VoucherService) {}

    @Get()
    async vouchers(): Promise<VoucherDto[]> {
        return this.voucherService.getVouchers();
    }

    @Post()
    async create(@Body() data: CreateVoucher): Promise<VoucherDto> {
        if (data.code == "" || !data.code) {
            data.code = this.voucherService.generateCode(8);
        }

        return this.voucherService.createVoucher(data);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: UpdateVoucher): Promise<VoucherDto> {
        return this.voucherService.updateVoucher({
            where: { id: id },
            data,
        });
    }
}
