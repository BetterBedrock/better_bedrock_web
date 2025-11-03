import { Card, CardBody, CardDivider } from "@/_components/card";

import { FeaturedCardAds, FeaturedCardTitle, styles } from ".";

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
