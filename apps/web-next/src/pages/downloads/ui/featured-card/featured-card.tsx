import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { FeaturedCardButtons } from "@/pages/downloads/ui/featured-card/featured-card-buttons";
import { FeaturedCardTitle } from "@/pages/downloads/ui/featured-card/featured-card-title";

export const FeaturedCard = async () => (
  <Card fullWidth>
    <CardBody>
      <FeaturedCardTitle />
    </CardBody>
    <CardDivider />
    <CardBody>
      <FeaturedCardButtons />
    </CardBody>
    {/* <CardDivider />
      <CardBody>
        <PartnerImage />
      </CardBody> */}
  </Card>
);
