import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useAnalytics } from "~/providers/analytics";
import { Routes } from "~/utils/routes";

export const useStats = () => {
    const navigate = useNavigate();
    const { selectedUser, setAnalytics, analytics } = useUserProfile();
    const { fetchUserAnalytics } = useAnalytics();

    const [fetchedUserId, setFetchedUserId] = useState(() => {
        if (selectedUser && analytics && analytics.length > 0) {
            return selectedUser.id;
        }
        return null;
    });

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

    const categories = analytics?.filter((value) => value.type === "file").map((value) => value.name);

    const data = categories?.reduce((acc: { [key: string]: typeof analytics }, category) => {
        acc[category] = analytics?.filter((a) => a.name === category);
        return acc;
    }, {});

    return { data, analytics };
};