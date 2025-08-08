import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AdminAuthGuard } from "~/auth/admin-auth.guard";
import { CreateVoucher } from "~/voucher/dto/create-voucher.dto";
import { UpdateVoucher } from "~/voucher/dto/update-voucher.dto";
import { VoucherDto } from "~/voucher/dto/voucher.dto";
import { VoucherService } from "~/voucher/voucher.service";

@ApiTags("voucher")
@Controller("voucher")
export class VoucherController {
    constructor(private voucherService: VoucherService) {}

    @Get()
    @ApiOkResponse({
        description: "Returns list of existing voucher",
        type: VoucherDto,
        isArray: true,
    })
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async vouchers(): Promise<VoucherDto[]> {
        return await this.voucherService.getVouchers();
    }

    @Post()
    @ApiOkResponse({
        description: "Returns newly created voucher",
        type: VoucherDto,
    })
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async create(@Body() data: CreateVoucher): Promise<VoucherDto> {
        if (data.code == "" || !data.code) {
            data.code = this.voucherService.generateCode(8);
        }

        return await this.voucherService.createVoucher(data);
    }

    @Patch(":id")
    @ApiOkResponse({
        description: "Returns updated voucher",
        type: VoucherDto,
    })
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    async update(@Param("id") id: string, @Body() data: UpdateVoucher): Promise<VoucherDto> {
        return await this.voucherService.updateVoucher({
            where: { id: id },
            data,
        });
    }
}
