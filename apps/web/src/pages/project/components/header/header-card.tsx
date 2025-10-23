import { Card, CardDivider } from "~/components/bedrock/card";
import { SubmittedOverlay } from "~/pages/project/components/submitted-overlay";
import { ProjectMode } from "~/pages/project/project";
import { useProjectManager } from "~/pages/project/providers/project-manager";

import { styles, ProjectDetails, AuthorDetails } from ".";

interface HeaderCardProps {
  mode: ProjectMode;
}

export const HeaderCard = ({ mode }: HeaderCardProps) => {
  const { selectedProject } = useProjectManager();

  return (
    <Card sub className={styles.information}>
      {mode === "edit" && selectedProject!.submitted && <SubmittedOverlay />}
      <ProjectDetails mode={mode} />

      <CardDivider sub />

      <AuthorDetails mode={mode} />
    </Card>
  );
};
