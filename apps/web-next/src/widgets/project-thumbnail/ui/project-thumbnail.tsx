import { ProjectThumbnailPlaceholder } from "./project-thumbnail-placeholder";
import { Card, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/api/openapi";

import styles from "./project-thumbnail.module.scss";
import { ProjectHeaderTitle } from "@/widgets/project-header/ui/project-header-title";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay/submitted-overlay";

interface ProjectThumbnailProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectThumbnail = ({
  detailedProject,
}: ProjectThumbnailProps) => (
  <Card sub className={styles.overlay}>
    {detailedProject.submitted && <SubmittedOverlay />}
    <div className={styles.editor}>
      <ProjectHeaderTitle title="Thumbnail" />
    </div>
    <CardDivider sub />
    <div className={styles.editor}>
      <ProjectThumbnailPlaceholder />
    </div>
  </Card>
);
