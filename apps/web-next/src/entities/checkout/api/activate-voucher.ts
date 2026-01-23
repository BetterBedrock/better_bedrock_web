"use server";

import { activateVoucherRequest } from "./checkout-service";
import { cookies } from "next/headers";

export const activateVoucher = async (checkoutId?: string, code?: string) => {
    const cookie = await cookies();
    const existingVoucher = cookie.get("voucher")?.value;

    if (!checkoutId && !code && !existingVoucher) return;

    const { data, error } = await activateVoucherRequest(
        checkoutId,
        code ?? existingVoucher,
    );

    if (!existingVoucher) {
        cookie.set("voucher", data.code);
    }

    return { data, error };
};
