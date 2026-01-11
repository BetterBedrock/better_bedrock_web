import { Card, CardBody, CardDivider } from "@/components/card";
import { FeaturedCardAds } from "@/features/project/components/featured-card/featured-card-ads";
import { FeaturedCardTitle } from "@/features/project/components/featured-card/featured-card-title";

export const FeaturedCard = () => (
  <Card fullWidth>
    <CardBody>
      <FeaturedCardTitle />
    </CardBody>
    <CardDivider />
    <CardBody>
      <FeaturedCardAds />
    </CardBody>
  </Card>
);
