import { fetchSecret } from "@/_lib/user/fetch-secret";
import { fetchDetailedUserRequest } from "@/_services/user-service";


export const fetchDetailedUser = async (id: string) => {
    const secret = await fetchSecret();
    const { data } = await fetchDetailedUserRequest(id, secret);

    return data;
}