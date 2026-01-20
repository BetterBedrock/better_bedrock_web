"use server";

import { fetchSecret } from "@/lib/user";
import { fetchAllVouchersRequest } from "@/entities/voucher/api/voucher-service";

export const fetchAllVouchers = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllVouchersRequest(secret);
    return data;
};
