import clsx from "clsx";

import { DetailsEditorBetterBedrockContent } from "@/app/project/components/details-editor/details-editor-better-bedrock-content";
import { DetailsEditorDownloadFile } from "@/app/project/components/details-editor/details-editor-download-file";
import { DetailsEditorProjectType } from "@/app/project/components/details-editor/details-editor-project-type";
import { DetailsEditorTags } from "@/app/project/components/details-editor/details-editor-tags";

import { Card, CardDivider } from "@/_components/card";
import { DetailedProjectDto, UserDto } from "@/_lib/api";

import { SubmittedOverlay } from "@/app/project/components/submitted-overlay/submitted-overlay";
import { HeaderTitle } from "@/app/project/components/header/header-title";

import styles from "./details-editor.module.scss";

interface DetailsEditorProps {
  detailedProject: DetailedProjectDto;
  user: UserDto;
}

export const DetailsEditor = ({ detailedProject, user }: DetailsEditorProps) => {
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
