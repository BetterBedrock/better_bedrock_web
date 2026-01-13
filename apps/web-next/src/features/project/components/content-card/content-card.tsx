import { Card, CardBody, CardDivider } from "@/components/card";
import { fetchInitialProjects } from "../../server/fetch-initial-projects";
import { ContentCardSection } from "./content-card-section";
import { ContentCardTitle } from "./content-card-title";

export const ContentCard = async () => {
  const { searchResults } = await fetchInitialProjects({ params: { page: [] } });
  const items = searchResults.items.slice(0, 5);

  return (
    <Card fullWidth>
      <CardBody>
        <ContentCardTitle />
      </CardBody>
      <CardDivider />
      <CardBody>
        <ContentCardSection items={items} />
      </CardBody>
    </Card>
  );
};
