import { Card, CardDivider } from "@/_components/card";
import { GridDownloadCard } from "@/_components/grid-download-card";
import { useProjectManager } from "@/app/project/providers/project-manager";
import { HeaderTitle } from "@/app/project/components/header/header-title";
import { CardPreviewActions } from "@/app/project/components/card-preview/card-preview-actions";

import styles from "./card-preview.module.scss";

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
