import { Card } from "@/shared/ui/card";
import { ContentCardSection } from "./content-card-section";
import { ContentCardTitle } from "./content-card-title";
import { fetchInitialProjects } from "@/entities/project";

export const ContentCard = async () => {
  const { searchResults } = await fetchInitialProjects({
    params: { page: [] },
  });
  const items = searchResults.items.slice(0, 5);

  return (
    <Card fullWidth>
      <Card.Body>
        <ContentCardTitle />
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <ContentCardSection items={items} />
      </Card.Body>
    </Card>
  );
};
