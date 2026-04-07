"use server";

import { fetchLiveCountRequest } from "@/entities/analytic/api/analytics-service";
import { cookies } from "next/headers";

export const fetchLiveCount = async () => {
    const cookieStore = await cookies();
    const secret = cookieStore.get("secret")?.value ?? "";
    const { data, error } = await fetchLiveCountRequest(secret);

    return { data, error };
}