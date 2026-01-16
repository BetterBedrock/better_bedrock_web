import { Card, CardBody, CardDivider } from "@/components/card";
import { checkIfIsBot } from "@/lib/utils";
import { ProjectsCardBanner } from "./projects-card-banner";
import { ProjectsCardInfiniteContainer } from "./projects-card-infinite-container";
import { ProjectsCardOrder } from "./projects-card-order";
import { ProjectsCardPageContainer } from "./projects-card-page-container";
import { ProjectsCardSearchBar } from "./projects-card-search-bar";
import { ProjectsCardTitle } from "./projects-card-title";
import { ProjectsCardType } from "./projects-card-type";
import { ProjectsCardSearchProvider } from "../../providers/projects-card-search";
import { fetchInitialProjects } from "../../server/fetch-initial-projects";

import styles from "./projects-card.module.scss";

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
        <CardBody gap>
          <ProjectsCardTitle />
        </CardBody>
        <CardDivider />
        <CardBody gap>
          <div className={styles.filters}>
            <ProjectsCardSearchBar />
            <ProjectsCardType />
            <ProjectsCardOrder className={styles.orderFull} />
          </div>
        </CardBody>
        <CardDivider />
        <CardBody gap style={{ paddingBottom: "0" }}>
          <ProjectsCardBanner />
          {isBot ? (
            <ProjectsCardPageContainer
              currentPage={currentPage}
              searchResults={searchResults}
            />
          ) : (
            <ProjectsCardInfiniteContainer searchResults={searchResults} />
          )}
        </CardBody>
      </ProjectsCardSearchProvider>
    </Card>
  );
};
