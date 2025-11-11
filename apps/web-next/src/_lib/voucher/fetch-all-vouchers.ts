"use server";

import { fetchSecret } from "@/_lib/user";
import { fetchAllVouchersRequest } from "@/_services/voucher-service";

export const fetchAllVouchers = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllVouchersRequest(secret);
    return data;
}