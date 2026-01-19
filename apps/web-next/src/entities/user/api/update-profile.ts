import { UpdateProfileDto } from "@/shared/lib/openapi";
import { updateProfileRequest } from "@/entities/user/api/user-service";
import { fetchSecret } from "@/shared/lib/auth";

export const updateProfile = async (profile: UpdateProfileDto) => {
    const secret = await fetchSecret();

    const { data } = await updateProfileRequest(profile, secret);
    return data;
};
