import { StatisticsCard } from "@/components/statistics-card";
import styles from "./statistics-list.module.scss";
import { AnalyticsDto } from "@/lib/api";

interface StatisticsListProps {
  data: {
    [key: string]: AnalyticsDto[];
  };
}

export const StatisticsList = ({ data }: StatisticsListProps) => (
  <div className={styles.projects}>
    {Object.keys(data ?? []).map((name, index) => (
      <StatisticsCard
        key={name + index}
        name={name}
        data={data?.[name]}
        className={styles.card}
      />
    ))}
  </div>
);
