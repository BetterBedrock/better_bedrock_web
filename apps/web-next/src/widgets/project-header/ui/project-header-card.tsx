import { Card, CardDivider } from "@/shared/ui/card";
import { ProjectMode } from "@/shared/ui/grid-download-card";
import { DetailedProjectDto } from "@/shared/api/openapi";
import { AuthorDetails } from "@/widgets/project-header/ui/author-details/author-details";
import { ProjectDetails } from "@/widgets/project-header/ui/project-details/project-details";

import styles from "./project-header.module.scss";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay/submitted-overlay";

interface ProjectHeaderCardProps {
  mode: ProjectMode;
  selectedProject: DetailedProjectDto;
}

export const ProjectHeaderCard = ({
  mode,
  selectedProject,
}: ProjectHeaderCardProps) => {
  return (
    <Card sub className={styles.information}>
      {mode === "edit" && selectedProject!.submitted && <SubmittedOverlay />}
      <ProjectDetails mode={mode} detailedProject={selectedProject} />

      <CardDivider sub />

      <AuthorDetails mode={mode} selectedProject={selectedProject} />
    </Card>
  );
};
