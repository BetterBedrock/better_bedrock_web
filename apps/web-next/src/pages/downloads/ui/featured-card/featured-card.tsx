import { Card } from "@/shared/ui/card";
import { FeaturedCardButtons } from "@/pages/downloads/ui/featured-card/featured-card-buttons";
import { FeaturedCardTitle } from "@/pages/downloads/ui/featured-card/featured-card-title";

export const FeaturedCard = async () => (
  <Card fullWidth>
    <Card.Body>
      <FeaturedCardTitle />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <FeaturedCardButtons />
    </Card.Body>
    {/* <CardDivider />
      <CardBody>
        <PartnerImage />
      </CardBody> */}
  </Card>
);
