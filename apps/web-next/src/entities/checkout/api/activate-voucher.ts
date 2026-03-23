"use server";

import { activateVoucherRequest } from "./checkout-service";
import { cookies } from "next/headers";

/** 
Activates voucher with checkoutId, or code.
In case if, neither checkoutId, nor code are provided
voucher from cookies will be reactivated.
*/
export const activateVoucher = async (checkoutId?: string, code?: string) => {
    const cookie = await cookies();
    const existingVoucher = cookie.get("voucher")?.value;

    if (!checkoutId && !code && !existingVoucher) return { error: "You did not use a valid code or checkout ID, and you do not have an existing voucher to activate." }

    const { data, error } = await activateVoucherRequest(
        checkoutId,
        code ?? existingVoucher,
    );

    if (!existingVoucher && data) {
        cookie.set("voucher", data.code);
    }

    return { data, error };
};
