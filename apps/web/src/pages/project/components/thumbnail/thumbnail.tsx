import { Card, CardDivider } from "~/components/bedrock/card";
import { HeaderTitle } from "~/pages/project/components/header";
import { SubmittedOverlay } from "../submitted-overlay";
import { ThumbnailPlaceholder } from "~/pages/project/components/thumbnail/thumbnail-placeholder";
import { useProjectManager } from "~/pages/project/providers/project-manager";

import { styles } from ".";

export const Thumbnail = () => {
  const { selectedProject } = useProjectManager();

  return (
    <Card sub className={styles.overlay}>
      {selectedProject!.submitted && <SubmittedOverlay />}
      <div className={styles.editor}>
        <HeaderTitle title="Thumbnail" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <ThumbnailPlaceholder />
      </div>
    </Card>
  );
};
