import { ManageProfileDto } from "@/shared/api/openapi";
import { fetchSecret } from "@/lib/user/fetch-secret";
import { manageProfileRequest } from "@/entities/user/api/user-service";

export const manageProfile = async (id: string, profile: ManageProfileDto) => {
    const secret = await fetchSecret();

    const { data } = await manageProfileRequest(id, profile, secret);
    return data;
};
