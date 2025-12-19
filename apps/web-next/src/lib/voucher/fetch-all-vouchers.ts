"use server";

import { fetchSecret } from "@/lib/user";
import { fetchAllVouchersRequest } from "@/services/voucher-service";

export const fetchAllVouchers = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllVouchersRequest(secret);
    return data;
}