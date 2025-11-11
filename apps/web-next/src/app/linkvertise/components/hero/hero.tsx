import { Card, CardDivider } from "@/_components/card";

import { styles, HeroVideo, HeroHeading } from ".";

export const Hero = () => (
  <div className={styles.section}>
    <Card className={styles.card}>
      <HeroHeading />
      <CardDivider />
      <HeroVideo />
    </Card>
  </div>
);
