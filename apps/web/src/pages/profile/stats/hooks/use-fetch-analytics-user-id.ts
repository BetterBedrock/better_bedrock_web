import { useState } from "react";
import { AnalyticsDto, SimpleUserDto } from "~/lib/api";

interface UseFetchUserIdProps {
    selectedUser: SimpleUserDto | undefined;
    analytics: AnalyticsDto[] | undefined;
}

export const useFetchAnalyticsUserId = ({ analytics, selectedUser }: UseFetchUserIdProps) => {
    const [fetchedUserId, setFetchedUserId] = useState(() => {
        if (selectedUser && analytics && analytics.length > 0) {
            return selectedUser.id;
        }
        return null;
    });

    return { fetchedUserId, setFetchedUserId };
};