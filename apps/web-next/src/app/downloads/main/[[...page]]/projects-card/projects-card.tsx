"use server";

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
  styles,
} from ".";

import { isbot } from "isbot";
import { headers } from "next/headers";
import { MainProps } from "@/app/downloads/main/[[...page]]";
import { fetchSearchResults } from "@/_lib/projects/fetch-search-results";

export const ProjectsCard = async ({ params }: MainProps) => {
  const headersList = await headers();
  const ua = headersList.get("user-agent") || "";
  const isBot = isbot(ua);

  const loadedParmas = await params;

  let currentPage = 1;

  if (
    loadedParmas.page &&
    loadedParmas.page.length > 1 &&
    loadedParmas.page[0] === "page"
  ) {
    currentPage = parseInt(loadedParmas.page[1], 10) || 1;
  }

  const searchResults = await fetchSearchResults(
    undefined,
    undefined,
    undefined,
    currentPage
  );

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
