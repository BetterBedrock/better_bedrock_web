import { Card, CardBody, CardDivider } from "@/_components/card";

import {
  ProjectsCardBanner,
  ProjectsCardInfiniteContainer,
  ProjectsCardOrder,
  ProjectsCardPageContainer,
  ProjectsCardSearchBar,
  ProjectsCardSearchProvider,
  ProjectsCardTitle,
  ProjectsCardType,
  fetchInitialProjects,
  styles,
} from ".";

import { MainProps } from "@/app/downloads/main/[[...page]]";
import { checkIfIsBot } from "@/_lib/utils";

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
