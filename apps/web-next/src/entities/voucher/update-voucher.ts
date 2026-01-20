"use server";

import { UpdateVoucher } from "@/shared/api/openapi";
import { fetchSecret } from "@/lib/user";
import { updateVoucherRequest } from "@/entities/voucher/api/voucher-service";

export const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await updateVoucherRequest(id, voucher, secret);
    return data;
};
