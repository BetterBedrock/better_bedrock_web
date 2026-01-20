import { fetchSecret } from "@/lib/user/fetch-secret";
import { findUserByNameRequest } from "@/entities/user/api/user-service";

export const fetchUserByName = async (name: string) => {
    const secret = await fetchSecret();
    const { data } = await findUserByNameRequest(name, secret);

    return data;
};
