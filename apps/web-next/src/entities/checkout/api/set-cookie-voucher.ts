"use server";

import { cookies } from "next/headers";

export const setCookieVoucher = async (code: string) => {
    const cookie = await cookies();
    cookie.set("voucher", code);
};
