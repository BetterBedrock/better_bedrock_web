import { UpdateProfileDto } from "@/_lib/api";
import { fetchSecret } from "@/_lib/user/fetch-secret"
import { updateProfileRequest } from "@/_services/user-service";

export const updateProfile = async (profile: UpdateProfileDto) => {
    const secret = await fetchSecret();

    const { data } = await updateProfileRequest(profile, secret);
    return data;
}