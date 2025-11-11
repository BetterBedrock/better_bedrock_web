"use server";

import { UpdateVoucher } from "@/_lib/api";
import { fetchSecret } from "@/_lib/user";
import { updateVoucherRequest } from "@/_services/voucher-service";

export const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await updateVoucherRequest(id, voucher, secret);
    return data;
}