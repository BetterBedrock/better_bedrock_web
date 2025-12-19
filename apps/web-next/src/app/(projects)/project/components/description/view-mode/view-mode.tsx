import { Card, CardDivider } from "@/components/card";
import { DetailedProjectDto } from "@/lib/api";
import { TiptapPreview } from "@/components/tiptap/preview";
import { HeaderTitle } from "@/app/(projects)/project/components/header/header-title";

import styles from "./view-mode.module.scss";

interface ViewModeProps {
  detailedProject: DetailedProjectDto;
}

export const ViewMode = ({ detailedProject }: ViewModeProps) => (
  <Card sub>
    <div className={styles.editor}>
      <HeaderTitle title="Description" />
    </div>
    <CardDivider sub />
    <div className={styles.editor}>
      <TiptapPreview
        detailedProject={detailedProject}
        content={detailedProject?.description}
      />
    </div>
  </Card>
);
