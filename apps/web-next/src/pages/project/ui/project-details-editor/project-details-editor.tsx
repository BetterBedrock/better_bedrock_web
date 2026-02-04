import { Card } from "@/shared/ui/card";
import { DetailedProjectDto, UserDto } from "@/shared/lib/openapi";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { ProjectDetailsEditorTags } from "./project-details-editor-tags";
import { ProjectDetailsEditorProjectType } from "./project-details-editor-project-type";
import { ProjectDetailsEditorBetterBedrockContent } from "./project-details-editor-better-bedrock-content";
import { ProjectDetailsEditorDownloadFile } from "./project-details-editor-download-file";

import styles from "./project-details-editor.module.scss";

interface ProjectDetailsEditorProps {
  detailedProject: DetailedProjectDto;
  user: UserDto;
}

export const ProjectDetailsEditor = ({
  detailedProject,
  user,
}: ProjectDetailsEditorProps) => {
  return (
    <>
      <Card className={styles.information}>
        {detailedProject.submitted && <SubmittedOverlay />}
        <Card.Body>
          <ProjectHeaderTitle title="Details" />
        </Card.Body>

        <Card.Divider />
        <Card.Body gap="sm">
          <ProjectDetailsEditorProjectType />
        </Card.Body>

        <Card.Divider />
        <Card.Body>
          <ProjectDetailsEditorTags />
        </Card.Body>

        <Card.Divider />
        <Card.Body>
          <ProjectDetailsEditorDownloadFile />
        </Card.Body>

        {user?.admin && (
          <>
            <Card.Divider />
            <Card.Body gap="sm">
              <ProjectDetailsEditorBetterBedrockContent />
            </Card.Body>
          </>
        )}
      </Card>
    </>
  );
};
