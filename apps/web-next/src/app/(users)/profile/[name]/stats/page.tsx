import { Banner } from "@/components/banner";
import { StatisticsCard } from "@/components/statistics-card";
import { fetchUserAnalytics } from "@/lib/analytics/fetch-user-analytics";
import { notFound } from "next/navigation";
import { simplifyAnalytics } from "@/lib/analytics/simplify-analytics";
import { fetchUserByName } from "@/lib/user";

import styles from "./stats.module.scss";

interface StatsProps {
  params?: Promise<{ name: string }>;
}

export const revalidate = 60;

export default async function Stats({ params }: StatsProps) {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const user = await fetchUserByName(loadedParams.name);
  if (!user) {
    notFound();
  }
  const data = await fetchUserAnalytics(user.id);
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
