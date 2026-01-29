import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { FeaturedCardButtons } from "@/pages/downloads/ui/featured-card/featured-card-buttons";
import { FeaturedCardTitle } from "@/pages/downloads/ui/featured-card/featured-card-title";
import { fetchInitialProjects } from "@/entities/project";
import { PartnerImage } from "@/shared/ui/partner-image";

export const FeaturedCard = async () => {
  const { searchResults } = await fetchInitialProjects({
    params: { page: [] },
  });
  const items = searchResults.items.slice(0, 5);

  return (
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
};
