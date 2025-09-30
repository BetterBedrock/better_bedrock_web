import { useRef } from "react";
import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { TextEditor } from "~/components/text-editor";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { ProjectMode } from "~/pages/project";
import { Content } from "@tiptap/react";

interface DescriptionProps {
  mode: ProjectMode;
}

export const Description = ({ mode }: DescriptionProps) => {
  const { selectedProject, handleSaveProject, editorContent } = useProjectManager();

  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  if (editorContent.current === undefined) {
    editorContent.current = selectedProject?.description;
  }

  const handleChange = (data: Content | undefined) => {
    editorContent.current = data;

    if (mode !== "edit") return;

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      if (selectedProject) handleSaveProject(selectedProject);
    }, 500);
  };

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
          onChange={handleChange}
          onUpload={() => handleSaveProject(selectedProject!)}
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
        <TextEditor editable={false} content={selectedProject?.description} />
      </div>
    </Card>
  );
};
