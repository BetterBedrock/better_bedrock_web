"use server";

import { CreateVoucher } from "@/shared/api/openapi";
import { fetchSecret } from "@/lib/user";
import { createVoucherRequest } from "@/entities/voucher/api/voucher-service";

export const createVoucher = async (voucher: CreateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await createVoucherRequest(voucher, secret);
    return data;
};
