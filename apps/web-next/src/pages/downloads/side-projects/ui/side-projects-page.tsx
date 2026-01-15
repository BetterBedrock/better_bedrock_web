import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list/grid-download-card-list";
import { SideProjectsHeading } from "@/pages/downloads/side-projects/ui/side-projects-heading";
import { SideProjectsBanner } from "@/pages/downloads/side-projects/ui/side-projects-banner";
import { loadDownloadsSideProjectsPageData } from "@/entities/project/api/load-downloads-side-projects-page-data";

import { Card, CardBody, CardDivider } from "@/shared/ui/card/card";

export const revalidate = 300;

export const SideProjectsPage = async () => {
  const projects = await loadDownloadsSideProjectsPageData();

  if (projects.length < 1) {
    return <SideProjectsBanner />;
  }

  return (
    <Card fullWidth>
      <CardBody>
        <SideProjectsHeading />
      </CardBody>
      <CardDivider />
      <CardBody>
        <GridDownloadCardList projects={projects} />
      </CardBody>
    </Card>
  );
};
