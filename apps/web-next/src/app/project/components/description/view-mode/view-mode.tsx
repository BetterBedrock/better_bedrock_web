import { Card, CardDivider } from "@/_components/card";
import { HeaderTitle } from "@/app/project/components/header";
import { DetailedProjectDto } from "@/_lib/api";
import { TiptapPreview } from "@/_components/tiptap/preview";

import { styles } from ".";

interface ViewModeProps {
  detailedProject: DetailedProjectDto;
}

export const ViewMode = ({ detailedProject }: ViewModeProps) => {
  return (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Description" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <TiptapPreview detailedProject={detailedProject} content={detailedProject?.description} />
      </div>
    </Card>
  );
};
