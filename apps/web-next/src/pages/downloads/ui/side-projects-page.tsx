import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list";
import { SideProjectsHeading } from "@/pages/downloads/ui/side-projects-heading";
import { SideProjectsBanner } from "@/pages/downloads/ui/side-projects-banner";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { loadDownloadsSideProjectsPageData } from "@/pages/downloads/api/load-downloads-side-projects-page-data";

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
