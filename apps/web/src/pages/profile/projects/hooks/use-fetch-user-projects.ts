import { useState } from "react";
import { SimpleProjectDto, SimpleUserDto } from "~/lib/api";

interface UseFetchUserProjectsProps {
    selectedUser: SimpleUserDto | undefined;
    projects: SimpleProjectDto[] | undefined;
}

export const useFetchUserProjects = ({ selectedUser, projects }: UseFetchUserProjectsProps) => {
    const [fetchedUserId, setFetchedUserId] = useState(() => {
        if (selectedUser && projects && projects.length > 0) {
            return selectedUser.id;
        }
        return null;
    });

    return { fetchedUserId, setFetchedUserId };
};