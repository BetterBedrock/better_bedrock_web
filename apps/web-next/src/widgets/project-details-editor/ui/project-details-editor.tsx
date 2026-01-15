import clsx from "clsx";

import { ProjectDetailsEditorBetterBedrockContent } from "@/widgets/project-details-editor/ui/project-details-editor-better-bedrock-content";
import { ProjectDetailsEditorDownloadFile } from "@/widgets/project-details-editor/ui/project-details-editor-download-file";
import { ProjectDetailsEditorProjectType } from "@/widgets/project-details-editor/ui/project-details-editor-project-type";
import { ProjectDetailsEditorTags } from "@/widgets/project-details-editor/ui/project-details-editor-tags";

import { Card, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto, UserDto } from "@/shared/api/openapi";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay/submitted-overlay";
import { ProjectHeaderTitle } from "@/widgets/project-header/ui/project-header-title";

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
