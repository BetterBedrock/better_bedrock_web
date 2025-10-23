import { Card, CardDivider } from "~/components/bedrock/card";
import { TextEditor } from "~/components/text-editor";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";

import { styles } from ".";

export const ViewMode = () => {
  const { selectedProject } = useProjectManager();

  return (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Description" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <TextEditor editable={false} content={selectedProject?.description} />
      </div>
    </Card>
  );
};
