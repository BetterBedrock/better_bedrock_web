import { Card } from "@/shared/ui/card";
import { ProjectsCardBanner } from "./projects-card-banner";
import { ProjectsCardPageContainer } from "./projects-card-page-container";
import { ProjectsCardTitle } from "./projects-card-title";
import { ProjectsCardDescription } from "./projects-card-description";
import { ProjectsCardFilters } from "./projects-card-filters";
import { fetchInitialProjects } from "@/entities/project";
import { ProjectType } from "@/shared/lib/openapi";

export const revalidate = 60;

export interface ProjectsCardProps {
  page: number;
  type?: ProjectType;
}

export const ProjectsCard = async ({ page, type }: ProjectsCardProps) => {
  const { currentPage, searchResults } = await fetchInitialProjects(page, type);

  return (
    <Card fullWidth>
      <Card.Body>
        <ProjectsCardTitle type={type} />
        <ProjectsCardDescription type={type} />
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
    </Card>
  );
};
