import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { styles } from ".";

export const Statistics = () => (
  <div className={styles.list}>
    <StatisticsCard name="Total Downloads" data="221423" className={styles.card} />
    <StatisticsCard name="Verified Downloads" data="123445" className={styles.card} />
    <StatisticsCard name="Downloads Today" data="121" className={styles.card} />
    <StatisticsCard name="Downloads This Week" data="879" className={styles.card} />
  </div>
);
