"use client";

import { VoucherDto } from "@/lib/api";
import { useCookies } from "next-client-cookies"

export const useFetchVoucher = (): VoucherDto | undefined => {
    const cookies = useCookies();

    const voucherString = cookies.get("voucher");

    if (voucherString) {
        try {
            const voucher = JSON.parse(voucherString);
            if (voucher satisfies VoucherDto) {
                return voucher;
            }
        } catch (err) {
            console.log(err);
        }
    }
    return undefined;
}