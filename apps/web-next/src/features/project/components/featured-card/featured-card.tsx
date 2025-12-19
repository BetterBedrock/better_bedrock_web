import { Card, CardBody, CardDivider } from "@/components/card";
import { FeaturedCardAds } from "@/features/project/components/featured-card/featured-card-ads";
import { FeaturedCardTitle } from "@/features/project/components/featured-card/featured-card-title";

import styles from "./featured-card.module.scss";

export const FeaturedCard = () => (
  <Card sub className={styles.main}>
    <CardBody>
      <FeaturedCardTitle />
    </CardBody>
    <CardDivider sub />
    <CardBody>
      <FeaturedCardAds />
    </CardBody>
  </Card>
);
