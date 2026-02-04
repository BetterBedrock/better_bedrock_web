import { ProjectThumbnailPlaceholder } from "./project-thumbnail-placeholder";
import { DetailedProjectDto } from "@/shared/lib/openapi";

import styles from "./project-thumbnail.module.scss";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";
import { Card } from "@/shared/ui/card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";

interface ProjectThumbnailProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectThumbnail = ({
  detailedProject,
}: ProjectThumbnailProps) => (
  <Card className={styles.overlay}>
    {detailedProject.submitted && <SubmittedOverlay />}
    <Card.Body>
      <ProjectHeaderTitle title="Thumbnail" />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <ProjectThumbnailPlaceholder />
    </Card.Body>
  </Card>
);
