"use server";

import { fetchUserRatingRequest } from "@/entities/user/api/user-service";
import { Routes } from "@/shared/lib/utils";
import { notFound, redirect } from "next/navigation";

export const loadUserRating = async (id?: string) => {
    if (!id) {
        redirect(Routes.HOME);
    }

    try {
        const { data } = await fetchUserRatingRequest(id);
        return data;
    } catch (_) {
        notFound();
    }
};
