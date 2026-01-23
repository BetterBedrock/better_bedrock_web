import clsx from "clsx";

import { Card, CardDivider } from "@/shared/ui/card";
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
      <Card sub className={styles.information}>
        {detailedProject.submitted && <SubmittedOverlay />}
        <div className={clsx(styles.editor)}>
          <ProjectHeaderTitle title="Details" />
        </div>

        <CardDivider sub />
        <ProjectDetailsEditorProjectType />

        <CardDivider sub />
        <ProjectDetailsEditorTags />

        {user?.admin && <ProjectDetailsEditorBetterBedrockContent />}

        <CardDivider sub />
        <ProjectDetailsEditorDownloadFile />
      </Card>
    </>
  );
};
