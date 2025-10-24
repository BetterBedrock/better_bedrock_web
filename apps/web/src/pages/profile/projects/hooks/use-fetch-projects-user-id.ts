import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useProject } from "~/providers/project";
import { Routes } from "~/utils/routes";

import { useFetchUserProjects } from ".";

export const useFetchProjectsUserId = () => {
    const navigate = useNavigate();
    const { selectedUser, projects, setProjects } = useUserProfile();
    const { fetchUserProjects } = useProject();
    const { fetchedUserId, setFetchedUserId } = useFetchUserProjects({ selectedUser, projects });

    const fetchProjects = async (id: string) => {
        const data = await fetchUserProjects(id);
        setProjects(data?.filter((d) => d.draft === false) ?? []);
        setFetchedUserId(id);
    };

    useEffect(() => {
        if (!selectedUser) {
            navigate(Routes.HOME);
            return;
        }

        if (selectedUser.id !== fetchedUserId) {
            fetchProjects(selectedUser.id);
        }
    }, [selectedUser]);

    return projects;
};