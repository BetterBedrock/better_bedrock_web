"use server";

import { ManageProfileDto } from "@/shared/lib/openapi";
import { manageProfileRequest } from "@/entities/user/api/user-service";
import { fetchSecret } from "@/shared/lib/auth";

export const manageProfile = async (id: string, profile: ManageProfileDto) => {
    const secret = await fetchSecret();

    const { data, error } = await manageProfileRequest(id, profile, secret);
    return { data, error };
};
