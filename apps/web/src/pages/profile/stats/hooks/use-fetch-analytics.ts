import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useAnalytics } from "~/providers/analytics";
import { Routes } from "~/utils/routes";
import { useSimplifyAnalytics } from "~/hooks/use-simplify-analytics";

import { useFetchAnalyticsUserId } from ".";

export const useFetchAnalytics = () => {
    const navigate = useNavigate();
    const { selectedUser, setAnalytics, analytics } = useUserProfile();
    const { fetchUserAnalytics } = useAnalytics();
    const { fetchedUserId, setFetchedUserId } = useFetchAnalyticsUserId({ selectedUser, analytics });

    const fetchAnalytics = async (id: string) => {
        const data = await fetchUserAnalytics(id);
        setAnalytics(data ?? []);
        setFetchedUserId(id);
    };

    useEffect(() => {
        if (!selectedUser) {
            navigate(Routes.HOME);
            return;
        }

        if (selectedUser.id !== fetchedUserId) {
            fetchAnalytics(selectedUser.id);
        }
    }, [selectedUser]);

    const data = useSimplifyAnalytics({ analytics: analytics ?? [] });

    return { data, analytics };
};