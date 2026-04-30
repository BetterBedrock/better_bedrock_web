"use server";

import { cookies } from "next/headers";

export const fetchLocalSession = async () => {
    const cookieStore = await cookies();
    const localSession = cookieStore.get("localSession");

    return localSession?.value;
}