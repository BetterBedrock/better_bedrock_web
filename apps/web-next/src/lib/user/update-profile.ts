import { UpdateProfileDto } from "@/lib/api";
import { fetchSecret } from "@/lib/user/fetch-secret"
import { updateProfileRequest } from "@/services/user-service";

export const updateProfile = async (profile: UpdateProfileDto) => {
    const secret = await fetchSecret();

    const { data } = await updateProfileRequest(profile, secret);
    return data;
}