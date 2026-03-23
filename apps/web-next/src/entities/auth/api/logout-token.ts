"use server";

import { cookies } from "next/headers";

export const logoutToken = async () => {
    const cookie = await cookies();

    cookie.delete("secret");
}