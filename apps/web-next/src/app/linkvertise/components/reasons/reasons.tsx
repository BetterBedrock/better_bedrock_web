import { Card, CardDivider } from "@/_components/card";
import { ReasonsGridList, ReasonsHeading, styles } from ".";

export const Reasons = () => (
  <div className={styles.section}>
    <div className={styles.statistics}>
      <Card className={styles.card}>
        <ReasonsHeading />
        <CardDivider />
        <ReasonsGridList />
      </Card>
    </div>
  </div>
);
