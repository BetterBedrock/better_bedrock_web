import { UpdateProfileDto } from "@/shared/api/openapi";
import { fetchSecret } from "@/lib/user/fetch-secret";
import { updateProfileRequest } from "@/entities/user/api/user-service";

export const updateProfile = async (profile: UpdateProfileDto) => {
    const secret = await fetchSecret();

    const { data } = await updateProfileRequest(profile, secret);
    return data;
};
