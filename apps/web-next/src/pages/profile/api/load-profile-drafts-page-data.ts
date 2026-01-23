import { fetchLoggedUser } from "@/entities/auth";
import { fetchUserDrafts } from "@/entities/project";
import { loadUserProfile } from "@/entities/user";
import { Routes } from "@/shared/lib/utils";
import { notFound, redirect } from "next/navigation";

export const loadProfileDraftsPageData = async (
    params?: Promise<{ name: string }>,
) => {
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
};
