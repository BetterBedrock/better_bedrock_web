import { AnalyticsDto, AnalyticsType } from "~/lib/api";

interface UseSimplifyAnalyticsProps {
    type?: AnalyticsType;
    analytics: AnalyticsDto[];
}

export const useSimplifyAnalytics = ({ analytics, type = "file" }: UseSimplifyAnalyticsProps) => {
    const categories = analytics?.filter((value) => value.type === type).map((value) => value.name);

    const data = categories?.reduce((acc: { [key: string]: typeof analytics }, category) => {
        acc[category] = analytics?.filter((a) => a.name === category);
        return acc;
    }, {});


    return data;
};