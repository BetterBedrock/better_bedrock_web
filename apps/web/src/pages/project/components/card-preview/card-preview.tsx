import { Card, CardDivider } from "~/components/bedrock/card";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { HeaderTitle } from "~/pages/project/components/header";
import { CardPreviewActions } from "~/pages/project/components/card-preview/card-preview-actions";

export const CardPreview = () => {
  const { selectedProject } = useProjectManager();
  
  return (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Review" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        {selectedProject && <GridDownloadCard project={{ ...selectedProject }} />}
      </div>
      <CardDivider sub />
      <CardPreviewActions />
    </Card>
  );
};
