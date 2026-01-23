import { Card, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { AuthorDetails } from "@/pages/project/ui/project-header/author-details/author-details";
import { ProjectDetails } from "@/pages/project/ui/project-header/project-details/project-details";

import styles from "./project-header.module.scss";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";
import { ProjectMode } from "@/shared/ui/grid-download-card";

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
