import { Card } from "@/shared/ui/card";
import { ProjectsCardBanner } from "./projects-card-banner";
import { ProjectsCardPageContainer } from "./projects-card-page-container";
import { ProjectsCardTitle } from "./projects-card-title";
import { ProjectsCardDescription } from "./projects-card-description";
import { ProjectsCardFilters } from "./projects-card-filters";
import { fetchInitialProjects } from "@/entities/project";
import { ProjectsCardSearchProvider } from "@/pages/downloads/model/projects-card-search";

export const revalidate = 60;

export interface ProjectsCardProps {
  page: number;
}

export const ProjectsCard = async ({ page }: ProjectsCardProps) => {
  const { currentPage, searchResults } = await fetchInitialProjects(page);

  return (
    <Card fullWidth>
      <ProjectsCardSearchProvider>
        <Card.Body>
          <ProjectsCardTitle />
          <ProjectsCardDescription />
        </Card.Body>
        <Card.Divider />
        <Card.Body gap="sm">
          <ProjectsCardFilters />
        </Card.Body>
        <Card.Divider />
        <Card.Body gap="md">
          <ProjectsCardBanner />
          <ProjectsCardPageContainer
            currentPage={currentPage}
            searchResults={searchResults}
          />
        </Card.Body>
      </ProjectsCardSearchProvider>
    </Card>
  );
};
