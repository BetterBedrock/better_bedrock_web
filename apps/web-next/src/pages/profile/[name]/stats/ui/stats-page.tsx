import { Banner } from "@/shared/ui/banner";
import { StatisticsList } from "@/widgets/statistics-list/ui/statistics-list";
import { loadProfileStatsPageData } from "@/pages/profile/[name]/stats/api/load-profile-stats-page-data";

interface StatsPageProps {
  params?: Promise<{ name: string }>;
}

export const revalidate = 60;

export const StatsPage = async ({ params }: StatsPageProps) => {
  const simplified = await loadProfileStatsPageData(params);

  if (Object.keys(simplified ?? []).length < 1) {
    return <Banner type="neutral" message="No statistics available." />;
  }

  return <StatisticsList data={simplified} />;
};
