"use server";

import { UpdateVoucher } from "@/lib/api";
import { fetchSecret } from "@/lib/user";
import { updateVoucherRequest } from "@/services/voucher-service";

export const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await updateVoucherRequest(id, voucher, secret);
    return data;
}