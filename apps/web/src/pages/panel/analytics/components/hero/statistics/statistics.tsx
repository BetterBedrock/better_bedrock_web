import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { styles } from ".";

export const Statistics = () => (
  <div className={styles.list}>
    {/* <Label extraClassName={styles.label}>
      <div className={styles.data}>
        <BedrockText type="p" text={"Visits"} textAlign="left" color="grey" />
        <BedrockText type="h2" text={"100021"} textAlign="left" font="Minecraft" />
      </div>
      <BarChart direction={"horizontal"} data={undefined} />
    </Label> */}
    <StatisticsCard name="Total Downloads" data="221423" className={styles.card} />
    <StatisticsCard name="Verified Downloads" data="123445" className={styles.card} />
    <StatisticsCard name="Downloads Today" data="121" className={styles.card} />
    <StatisticsCard name="Downloads This Week" data="879" className={styles.card} />
  </div>
);
