"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export const initializeLocalSession = async () => {
    const cookieStore = await cookies();
    const randLocalSession = uuidv4();

    cookieStore.set("localSession", randLocalSession);

    return randLocalSession;
}