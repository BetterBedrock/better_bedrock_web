import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { styles } from ".";

export const Statistics = () => (
  <div className={styles.list}>
    <StatisticsCard name="better_bedrock_app.apk" data="27411" className={styles.card} />
    <StatisticsCard name="better_bedrock_v7.mcpack" data="37654" className={styles.card} />
    <StatisticsCard name="better_bedrock_v6.mcpack" data="85932" className={styles.card} />
    <StatisticsCard name="better_bedrock_v5.mcpack" data="23109" className={styles.card} />
  </div>
);
