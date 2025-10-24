import { useState } from "react";
import { SimpleProjectDto, SimpleUserDto } from "~/lib/api";

interface UseFetchDraftsUserIdProps {
    selectedUser: SimpleUserDto | undefined;
    drafts: SimpleProjectDto[] | undefined;
}

export const useFetchDraftsUserId = ({ selectedUser, drafts }: UseFetchDraftsUserIdProps) => {
    const [fetchedUserId, setFetchedUserId] = useState(() => {
        if (selectedUser && drafts && drafts.length > 0) {
            return selectedUser.id;
        }
        return null;
    });

    return { fetchedUserId, setFetchedUserId };
};