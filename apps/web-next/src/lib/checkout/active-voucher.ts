import { activateVoucherRequest } from "@/services/checkout-service"

export const activateVoucher = async (checkoutId?: string, code?: string) => {
    if (!checkoutId && !code) return;
    const { data } = await activateVoucherRequest(checkoutId, code);

    return data;
}