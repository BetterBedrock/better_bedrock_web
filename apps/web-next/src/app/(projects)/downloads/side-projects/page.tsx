import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";
import { SideProjectsHeading } from "@/features/project/components/side-projects/side-projects-heading";
import { SideProjectsBanner } from "@/features/project/components/side-projects/side-projects-banner";
import { loadDownloadsSideProjectsPageData } from "@/features/project/server/load-downloads-side-projects-page-data";

import { Card, CardBody, CardDivider } from "@/components/card/card";

export const revalidate = 300;

export default async function SideProjects() {
  const projects = await loadDownloadsSideProjectsPageData();

  if (projects.length < 1) {
    return <SideProjectsBanner />
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
}
