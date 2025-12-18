import { Card, CardDivider } from "@/_components/card";

import { HeroVideo } from "./hero-video";
import { HeroHeading } from "./hero-heading";

import styles from "./hero.module.scss";

export const Hero = () => (
  <div className={styles.section}>
    <Card className={styles.card}>
      <HeroHeading />
      <CardDivider />
      <HeroVideo />
    </Card>
  </div>
);
