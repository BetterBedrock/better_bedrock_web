import { Card, CardDivider } from "@/_components/card";
import { ProjectMode } from "@/_components/grid-download-card";
import { DetailedProjectDto } from "@/_lib/api";
import { AuthorDetails } from "@/app/(projects)/project/components/header/author-details/author-details";
import { ProjectDetails } from "@/app/(projects)/project/components/header/project-details/project-details";
import { SubmittedOverlay } from "@/app/(projects)/project/components/submitted-overlay/submitted-overlay";

import styles from "./header.module.scss";

interface HeaderCardProps {
  mode: ProjectMode;
  selectedProject: DetailedProjectDto;
}

export const HeaderCard = ({ mode, selectedProject }: HeaderCardProps) => {
  return (
    <Card sub className={styles.information}>
      {mode === "edit" && selectedProject!.submitted && <SubmittedOverlay />}
      <ProjectDetails mode={mode} detailedProject={selectedProject} />

      <CardDivider sub />

      <AuthorDetails mode={mode} selectedProject={selectedProject} />
    </Card>
  );
};
