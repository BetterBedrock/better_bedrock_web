import { Card, CardDivider } from "@/_components/card";
import { ReasonsGridList } from "./reasons-grid-list";
import { ReasonsHeading } from "./reasons-heading";
import styles from "./reasons.module.scss";

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
