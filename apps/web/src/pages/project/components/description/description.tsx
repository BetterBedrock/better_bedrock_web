import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { TextEditor } from "~/components/text-editor";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { ProjectMode } from "~/pages/project";

interface DescriptionProps {
  mode: ProjectMode;
}

export const Description = ({ mode }: DescriptionProps) => {
  const { selectedProject, editorContent } = useProjectManager();
  if (editorContent.current === undefined) {
    editorContent.current = selectedProject?.description;
  }

  return mode === "edit" ? (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Description" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <TextEditor
          editable={true}
          content={selectedProject?.description}
          onChange={(data) => (editorContent.current = data)}
        />
      </div>
    </Card>
  ) : (
    <Card sub>
      <div className={styles.editor}>
        <HeaderTitle title="Description" />
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <TextEditor
          editable={false}
          content={selectedProject?.description}
          onChange={(data) => (editorContent.current = data)}
        />
      </div>
    </Card>
  );
};
