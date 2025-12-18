import { Card, CardDivider } from "@/_components/card";
import { DetailedProjectDto } from "@/_lib/api";
import { TiptapPreview } from "@/_components/tiptap/preview";
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
