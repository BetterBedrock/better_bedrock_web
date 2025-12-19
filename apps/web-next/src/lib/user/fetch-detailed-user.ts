import { fetchSecret } from "@/lib/user/fetch-secret";
import { fetchDetailedUserRequest } from "@/services/user-service";


export const fetchDetailedUser = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchDetailedUserRequest(id, secret);

    return data;
}