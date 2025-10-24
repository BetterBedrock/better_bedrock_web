import { Card, CardDivider } from "~/components/bedrock/card";
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
