import clsx from "clsx";
import { Card, CardDivider } from "~/components/bedrock/card";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useAuth } from "~/providers/auth";
import { SubmittedOverlay } from "../submitted-overlay";

import { DetailsEditorBetterBedrockContent, DetailsEditorDownloadFile, DetailsEditorProjectType, DetailsEditorTags, styles } from ".";

export const DetailsEditor = () => {
  const { user } = useAuth();
  const { selectedProject } = useProjectManager();
  
  if (!selectedProject) return;

  return (
    <>
      <Card sub className={styles.information}>
        {selectedProject.submitted && <SubmittedOverlay />}
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
