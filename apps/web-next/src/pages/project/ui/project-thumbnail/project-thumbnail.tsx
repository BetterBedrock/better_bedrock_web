import { ProjectThumbnailPlaceholder } from "./project-thumbnail-placeholder";
import { DetailedProjectDto } from "@/shared/lib/openapi";

import styles from "./project-thumbnail.module.scss";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";

interface ProjectThumbnailProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectThumbnail = ({
  detailedProject,
}: ProjectThumbnailProps) => (
  <Card className={styles.overlay}>
    {detailedProject.submitted && <SubmittedOverlay />}
    <CardBody>
      <ProjectHeaderTitle title="Thumbnail" />
    </CardBody>
    <CardDivider />
    <CardBody>
      <ProjectThumbnailPlaceholder />
    </CardBody>
  </Card>
);
