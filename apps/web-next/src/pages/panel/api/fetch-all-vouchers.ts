"use server";

import { fetchSecret } from "@/shared/lib/auth";
import { fetchAllVouchersRequest } from "./voucher-service";

export const fetchAllVouchers = async () => {
    const secret = await fetchSecret();
    const { data } = await fetchAllVouchersRequest(secret);
    return data;
};
