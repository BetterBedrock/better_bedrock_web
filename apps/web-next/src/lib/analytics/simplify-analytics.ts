import { AnalyticsType, AnalyticsDto } from "@/lib/api";

interface SimplifyAnalyticsProps {
    type?: AnalyticsType;
    analytics: AnalyticsDto[];
}

export const simplifyAnalytics = ({ analytics, type = "file" }: SimplifyAnalyticsProps) => {
    const categories = analytics?.filter((value) => value.type === type).map((value) => value.name);

    const data = categories?.reduce((acc: { [key: string]: typeof analytics }, category) => {
        acc[category] = analytics?.filter((a) => a.name === category);
        return acc;
    }, {});


    return data;
};