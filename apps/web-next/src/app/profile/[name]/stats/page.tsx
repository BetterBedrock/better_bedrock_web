import { Banner } from "@/_components/banner";
import { StatisticsCard } from "@/_components/statistics-card";
import { styles } from ".";
import { fetchUserAnalytics } from "@/_lib/analytics/fetch-user-analytics";
import { notFound } from "next/navigation";
import { simplifyAnalytics } from "@/_lib/analytics/simplify-analytics";

interface StatsProps {
  params?: Promise<{ name: string }>;
}

export const revalidate = 60

export default async function Stats({ params }: StatsProps) {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const data = await fetchUserAnalytics(loadedParams.name);
  const simplified = simplifyAnalytics({ analytics: data });

  if (Object.keys(simplified ?? []).length < 1) {
    return <Banner type="neutral" message="No statistics available" />;
  }

  return (
    <div className={styles.list}>
      <div className={styles.projects}>
        {Object.keys(simplified ?? []).map((name, index) => (
          <StatisticsCard
            key={name + index}
            name={name}
            data={simplified?.[name]}
            className={styles.card}
          />
        ))}
      </div>
    </div>
  );
}
