import { fetchUserByName } from "@/entities/user";
import { Routes } from "@/shared/lib/utils";
import { notFound, redirect } from "next/navigation";

export const loadUserProfile = async (name?: string) => {
    if (!name) {
        redirect(Routes.HOME);
    }

    try {
        const user = await fetchUserByName(name);
        if (!user) {
            redirect(Routes.HOME);
        }

        return user;
    } catch (_) {
        notFound();
    }
};
