"use server";

import { fetchSecret } from "@/lib/user";
import { uploadFileRequest } from "@/entities/project/api/project-service";

export const uploadFile = async (id: string, file: File | undefined) => {
    const secret = await fetchSecret();

    const { data, error } = await uploadFileRequest(id, file, secret);

    return { data, error };
};
