import { Banner } from "@/components/banner";
import { StatisticsList } from "@/components/statistics-list/statistics-list";
import { loadProfileStatsPageData } from "@/features/analytics/server/load-profile-stats-page-data";

interface StatsProps {
  params?: Promise<{ name: string }>;
}

export const revalidate = 60;

export default async function Stats({ params }: StatsProps) {
  const simplified = await loadProfileStatsPageData(params);

  if (Object.keys(simplified ?? []).length < 1) {
    return <Banner type="neutral" message="No statistics available." />;
  }

  return <StatisticsList data={simplified} />;
}
