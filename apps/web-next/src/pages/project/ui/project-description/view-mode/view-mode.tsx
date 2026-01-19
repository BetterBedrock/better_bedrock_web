import { Card, CardDivider } from "@/shared/ui/card";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { TiptapPreview } from "../tiptap/preview";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";

import styles from "./view-mode.module.scss";

interface ViewModeProps {
  detailedProject: DetailedProjectDto;
}

export const ViewMode = ({ detailedProject }: ViewModeProps) => (
  <Card sub>
    <div className={styles.editor}>
      <ProjectHeaderTitle title="Description" />
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
