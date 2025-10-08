import { useEffect, useState } from "react";
import { AnalyticsDto } from "~/lib/api";
import { useAnalytics } from "~/providers/analytics";
import { useAuth } from "~/providers/auth";

export const useStatistics = () => {

    const { fetchAnalytics } = useAnalytics();
    const { user } = useAuth();
    const [analytics, setAnalytics] = useState<AnalyticsDto[] | undefined>();

    const fetchData = async () => {
        setAnalytics(await fetchAnalytics() ?? []);
    }

    useEffect(() => {
        if (user && user.admin) {
            fetchData();
        }
    }, [user]);

    return { analytics };
}