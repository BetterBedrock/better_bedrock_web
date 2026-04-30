import { DetailedProjectDto } from "@/shared/lib/openapi";
import { Banner } from "@/shared/ui/banner";
import { GridDownloadCard } from "@/shared/ui/grid-download-card";
import { Popup } from "@/shared/ui/popup";
import { pick } from "lodash";

interface HeroReportsPopupGridDownloadCardProps {
  project?: DetailedProjectDto;
}

export const HeroReportsPopupGridDownloadCard = ({
  project,
}: HeroReportsPopupGridDownloadCardProps) => (
  <Popup.Part>
    {!project ? (
      <Banner message="This project has been deleted" variant="error" />
    ) : (
      <GridDownloadCard
        {...pick(
          project,
          "id",
          "title",
          "submitted",
          "lastChanged",
          "thumbnail",
          "type",
          "betterBedrockContent",
          "tags",
          "summary",
        )}
        userName={project.user.name}
        averageRating={project.rating.average}
        tags={project.tags.map((tag) => tag.name)}
        mode="view"
      />
    )}
  </Popup.Part>
);
