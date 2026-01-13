import { Card, CardBody, CardDivider } from "@/components/card";
import { FeaturedCardButtons } from "@/features/project/components/featured-card/featured-card-buttons";
import { FeaturedCardTitle } from "@/features/project/components/featured-card/featured-card-title";
import { fetchInitialProjects } from "../../server/fetch-initial-projects";
import { PartnerImage } from "@/components/partner-image";

export const FeaturedCard = async () => {
  const { searchResults } = await fetchInitialProjects({ params: { page: [] } });
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
      <CardDivider />
      <CardBody>
        <PartnerImage />
      </CardBody>
    </Card>
  );
};
