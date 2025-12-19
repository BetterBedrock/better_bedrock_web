import { Card, CardBody, CardDivider } from "@/components/card";
import { FeaturedCardAds } from "@/app/(projects)/downloads/main/[[...page]]/featured-card/featured-card-ads";
import { FeaturedCardTitle } from "@/app/(projects)/downloads/main/[[...page]]/featured-card/featured-card-title";

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
