import clsx from "clsx";

import { DetailsEditorBetterBedrockContent } from "@/features/project/components/details-editor/details-editor-better-bedrock-content";
import { DetailsEditorDownloadFile } from "@/features/project/components/details-editor/details-editor-download-file";
import { DetailsEditorProjectType } from "@/features/project/components/details-editor/details-editor-project-type";
import { DetailsEditorTags } from "@/features/project/components/details-editor/details-editor-tags";

import { Card, CardDivider } from "@/components/card";
import { DetailedProjectDto, UserDto } from "@/lib/api";

import { SubmittedOverlay } from "@/features/project/components/submitted-overlay/submitted-overlay";
import { HeaderTitle } from "@/features/project/components/header/header-title";

import styles from "./details-editor.module.scss";

interface DetailsEditorProps {
  detailedProject: DetailedProjectDto;
  user: UserDto;
}

export const DetailsEditor = ({
  detailedProject,
  user,
}: DetailsEditorProps) => {
  return (
    <>
      <Card sub className={styles.information}>
        {detailedProject.submitted && <SubmittedOverlay />}
        <div className={clsx(styles.editor)}>
          <HeaderTitle title="Details" />
        </div>

        <CardDivider sub />
        <DetailsEditorProjectType />

        <CardDivider sub />
        <DetailsEditorTags />

        {user?.admin && <DetailsEditorBetterBedrockContent />}

        <CardDivider sub />
        <DetailsEditorDownloadFile />
      </Card>
    </>
  );
};
