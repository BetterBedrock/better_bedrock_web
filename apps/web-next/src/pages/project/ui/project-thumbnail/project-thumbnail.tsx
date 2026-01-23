import { ProjectThumbnailPlaceholder } from "./project-thumbnail-placeholder";
import { DetailedProjectDto } from "@/shared/lib/openapi";

import styles from "./project-thumbnail.module.scss";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";
import { Card, CardDivider } from "@/shared/ui/card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";

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
