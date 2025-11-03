import { fetchUserRatingRequest } from "@/_services/user-service";
import { Routes } from "@/utils/routes";
import { notFound, redirect } from "next/navigation";

export const loadUserRating = async (name?: string) => {
    if (!name) {
        redirect(Routes.HOME);
    }

    try {
        const { data } = await fetchUserRatingRequest(name);
        return data;
    } catch (_) {
        notFound();
    }
}