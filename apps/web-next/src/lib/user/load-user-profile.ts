import { fetchUserByName } from "@/lib/user/fetch-user-by-name";
import { Routes } from "@/shared/model/routes";
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
