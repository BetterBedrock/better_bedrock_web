"use server";

import { UpdateVoucher } from "@/shared/lib/openapi";
import { updateVoucherRequest } from "./voucher-service";
import { fetchSecret } from "@/shared/lib/auth";

export const updateVoucher = async (id: string, voucher: UpdateVoucher) => {
    const secret = await fetchSecret();

    const { data } = await updateVoucherRequest(id, voucher, secret);
    return data;
};
