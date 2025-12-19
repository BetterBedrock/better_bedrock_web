"use server";

import { CreateVoucher } from "@/lib/api";
import { fetchSecret } from "@/lib/user";
import { createVoucherRequest } from "@/services/voucher-service";

export const createVoucher = async (voucher: CreateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await createVoucherRequest(voucher, secret);
    return data;
}