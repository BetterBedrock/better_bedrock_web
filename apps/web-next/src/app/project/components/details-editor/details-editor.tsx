import clsx from "clsx";

import { SubmittedOverlay } from "../submitted-overlay";

import { DetailsEditorBetterBedrockContent, DetailsEditorDownloadFile, DetailsEditorProjectType, DetailsEditorTags, styles } from ".";
import { Card, CardDivider } from "@/_components/card";
import { HeaderTitle } from "@/app/project/components/header";
import { DetailedProjectDto, UserDto } from "@/_lib/api";

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
