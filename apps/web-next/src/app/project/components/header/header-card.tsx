import { Card, CardDivider } from "@/_components/card";
import { ProjectMode } from "@/_components/grid-download-card";
import { SubmittedOverlay } from "@/app/project/components/submitted-overlay";
import { styles, AuthorDetails, ProjectDetails } from ".";
import { DetailedProjectDto } from "@/_lib/api";

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
