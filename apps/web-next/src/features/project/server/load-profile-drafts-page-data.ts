import { fetchUserDrafts } from "@/features/project/server/fetch-user-drafts";
import { fetchLoggedUser } from "@/lib/auth";
import { loadUserProfile } from "@/lib/user";
import { Routes } from "@/utils/routes";
import { notFound, redirect } from "next/navigation";

export const loadProfileDraftsPage = async (params?: Promise<{ name: string }>) => {
    const loadedParams = await params;

    if (!loadedParams) notFound();

    const user = await fetchLoggedUser();
    const selectedUser = await loadUserProfile(loadedParams.name);

    if (user?.id !== selectedUser.id && !user?.admin) {
        redirect(Routes.PROFILE + `/${loadedParams.name}/projects`);
    }

    const isOwner = selectedUser?.id === user?.id;

    const drafts = await fetchUserDrafts(selectedUser.id);
    return { drafts, isOwner };
}