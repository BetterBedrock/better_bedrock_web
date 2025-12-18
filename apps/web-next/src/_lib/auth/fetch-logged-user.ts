import { authenticateRequest } from "@/_services/auth-service";
import { cookies } from "next/headers";

export const fetchLoggedUser = async () => {
    const cookieStore = await cookies();
    const secret = cookieStore.get("secret")?.value;

    const user = secret ? (await authenticateRequest(secret)).data : undefined;

    return user;
}