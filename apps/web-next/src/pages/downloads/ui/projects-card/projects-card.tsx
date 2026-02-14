import { Card } from "@/shared/ui/card";
import { ProjectsCardBanner } from "./projects-card-banner";
import { ProjectsCardInfiniteContainer } from "./projects-card-infinite-container";
import { ProjectsCardOrder } from "./projects-card-order";
import { ProjectsCardPageContainer } from "./projects-card-page-container";
import { ProjectsCardSearchBar } from "./projects-card-search-bar";
import { ProjectsCardTitle } from "./projects-card-title";
import { ProjectsCardDescription } from "./projects-card-description";
import { ProjectsCardType } from "./projects-card-type";
import { fetchInitialProjects } from "@/entities/project";
import { ProjectsCardSearchProvider } from "@/pages/downloads/model/projects-card-search";

import styles from "./projects-card.module.scss";
import { checkIfIsBot } from "@/pages/downloads/api/check-if-is-bot";

export const revalidate = 60;

export interface ProjectsCardProps {
  params: Promise<{ page?: string[] }>;
}

export const ProjectsCard = async ({ params }: ProjectsCardProps) => {
  const isBot = await checkIfIsBot();
  const { currentPage, searchResults } = await fetchInitialProjects({
    params: isBot ? await params : {},
  });

  return (
    <Card fullWidth>
      <ProjectsCardSearchProvider>
        <Card.Body gap="md">
          <ProjectsCardTitle />
          <ProjectsCardDescription />
        </Card.Body>
        <Card.Divider />
        <Card.Body gap="md">
          <div className={styles.filters}>
            <ProjectsCardSearchBar />
            <ProjectsCardType />
            <ProjectsCardOrder className={styles.orderFull} />
          </div>
        </Card.Body>
        <Card.Divider />
        <Card.Body gap="md">
          <ProjectsCardBanner />
          {isBot ? (
            <ProjectsCardPageContainer
              currentPage={currentPage}
              searchResults={searchResults}
            />
          ) : (
            <ProjectsCardInfiniteContainer searchResults={searchResults} />
          )}
        </Card.Body>
      </ProjectsCardSearchProvider>
    </Card>
  );
};
