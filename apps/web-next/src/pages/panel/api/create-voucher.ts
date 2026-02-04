"use server";

import { CreateVoucher } from "@/shared/lib/openapi";
import { fetchSecret } from "@/shared/lib/auth";
import { createVoucherRequest } from "./voucher-service";

export const createVoucher = async (voucher: CreateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await createVoucherRequest(voucher, secret);
    return data;
};
