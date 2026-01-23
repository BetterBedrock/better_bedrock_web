"use server";

import { isbot } from "isbot";
import { headers } from "next/headers";

export const checkIfIsBot = async () => {
    const headersList = await headers();
    const ua = headersList.get("user-agent") || "";
    return isbot(ua);
}