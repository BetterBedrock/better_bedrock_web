"use server";

import { CreateVoucher } from "@/_lib/api";
import { fetchSecret } from "@/_lib/user";
import { createVoucherRequest } from "@/_services/voucher-service";

export const createVoucher = async (voucher: CreateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await createVoucherRequest(voucher, secret);
    return data;
}