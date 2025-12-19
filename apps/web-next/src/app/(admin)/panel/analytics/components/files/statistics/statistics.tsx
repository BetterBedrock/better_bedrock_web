import { fetchAllAnalytics } from "@/lib/analytics/fetch-all-analytics";
import { StatisticsList } from "./statistics-list";
import styles from "./statistics.module.scss";

export const Statistics = async () => {
  const analytics = await fetchAllAnalytics();

  return (
    <div className={styles.data}>
      <StatisticsList analytics={analytics} />
    </div>
  );
};
