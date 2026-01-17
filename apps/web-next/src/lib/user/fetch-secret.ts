"use server";

import { cookies } from "next/headers";

export const fetchSecret = async () => {
    const cookieStore = await cookies();
    const secret = cookieStore.get("secret")?.value ?? "";

    return secret;
}