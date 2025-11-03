import { fetchSecret } from "@/_lib/user/fetch-secret";
import { findUserByNameRequest } from "@/_services/user-service";

export const fetchUserByName = async (name: string) => {
    const secret = await fetchSecret();
    const { data } = await findUserByNameRequest(name, secret);

    return data;
}