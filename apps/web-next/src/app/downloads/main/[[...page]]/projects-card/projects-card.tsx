import { Card, CardBody, CardDivider } from "@/_components/card";
import { checkIfIsBot } from "@/_lib/utils";
import { MainProps } from "@/app/downloads/main/[[...page]]/page";
import { ProjectsCardBanner } from "./projects-card-banner";
import { ProjectsCardInfiniteContainer } from "./projects-card-infinite-container";
import { ProjectsCardOrder } from "./projects-card-order";
import { ProjectsCardPageContainer } from "./projects-card-page-container";
import { ProjectsCardSearchBar } from "./projects-card-search-bar";
import { ProjectsCardTitle } from "./projects-card-title";
import { ProjectsCardType } from "./projects-card-type";
import { ProjectsCardSearchProvider } from "./providers/projects-card-search";
import { fetchInitialProjects } from "./server/fetch-initial-projects";

import styles from "./projects-card.module.scss"

export const revalidate = 60;

export const ProjectsCard = async ({ params }: MainProps) => {
  const isBot = await checkIfIsBot();
  const { currentPage, searchResults } = await fetchInitialProjects({
    params: isBot ? await params : {},
  });

  return (
    <Card sub className={styles.main}>
      <CardBody>
        <ProjectsCardBanner />
        <ProjectsCardTitle />
      </CardBody>
      <CardDivider sub />
      <CardBody>
        <ProjectsCardSearchProvider>
          <ProjectsCardSearchBar />
          <ProjectsCardType />
          <ProjectsCardOrder />
          {isBot ? (
            <ProjectsCardPageContainer
              currentPage={currentPage}
              searchResults={searchResults}
            />
          ) : (
            <ProjectsCardInfiniteContainer searchResults={searchResults} />
          )}
        </ProjectsCardSearchProvider>
      </CardBody>
    </Card>
  );
};
