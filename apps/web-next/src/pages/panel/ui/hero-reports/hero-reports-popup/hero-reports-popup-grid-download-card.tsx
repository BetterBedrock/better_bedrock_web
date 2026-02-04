import { DetailedProjectDto } from "@/shared/lib/openapi";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { Popup } from "@/shared/ui/popup";

interface HeroReportsPopupGridDownloadCardProps {
  project: DetailedProjectDto;
}

export const HeroReportsPopupGridDownloadCard = ({
  project,
}: HeroReportsPopupGridDownloadCardProps) => (
  <Popup.Part>
    <GridDownloadCard project={project} mode="view" />
  </Popup.Part>
);
