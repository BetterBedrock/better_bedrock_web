import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

import { useFetchDraftsUserId } from ".";

export const useFetchUserDrafts = () => {
    const navigate = useNavigate();

    const { selectedUser, drafts, setDrafts } =
        useUserProfile();
    const { fetchUserProjects } = useProject();
    const { fetchedUserId, setFetchedUserId } = useFetchDraftsUserId({ selectedUser, drafts });

    const fetchDrafts = async (id: string) => {
        const data = await fetchUserProjects(id);
        const published = data?.filter((d) => d.draft === false).map((d) => d.id) ?? [];
        setDrafts(
            (data?.filter((d) => d.draft === true && !published.includes(d.id)) ?? []).sort((a, b) =>
                dayjs(a.lastChanged).isBefore(b.lastChanged) ? 1 : -1,
            ),
        );
        setFetchedUserId(id);
    };

    useEffect(() => {
        if (!selectedUser) {
            navigate(Routes.HOME);
            return;
        }

        if (selectedUser.id !== fetchedUserId) {
            fetchDrafts(selectedUser.id);
        }
    }, [selectedUser]);

    return drafts;
};