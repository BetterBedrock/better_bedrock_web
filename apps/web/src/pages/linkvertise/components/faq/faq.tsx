import { Card, CardDivider } from "~/components/bedrock/card";

import { FAQHeading, FAQList, styles } from ".";

export const FAQ = () => (
  <div className={styles.section}>
    <Card className={styles.card}>
      <FAQHeading />
      <CardDivider />
      <FAQList />
    </Card>
  </div>
);
