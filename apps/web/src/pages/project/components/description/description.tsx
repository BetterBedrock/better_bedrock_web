import { useRef, useState } from "react";
import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { TextEditor } from "~/components/text-editor";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { ProjectMode } from "~/pages/project";
import { Content } from "@tiptap/react";
import { SimpleButton } from "~/components/bedrock/simple-button";
import FullScreen from "~/assets/images/full_screen.png";
import clsx from "clsx";

interface DescriptionProps {
  mode: ProjectMode;
}

export const Description = ({ mode }: DescriptionProps) => {
  const { selectedProject, handleSaveProject, editorContent } = useProjectManager();
  const [fullScreen, setFullScreen] = useState(false);

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

  const handleFullScreen = () => {
    setFullScreen((prev) => !prev);

    if (!fullScreen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  return mode === "edit" ? (
    <Card sub className={fullScreen && styles.fullscreen}>
      <div className={clsx(styles.editor, styles.description)}>
        <div className={styles.title}>
          <HeaderTitle title="Description" />
          <SimpleButton transparent onClick={handleFullScreen} className={styles.mode}>
            <img src={FullScreen} className={styles.icon} />
          </SimpleButton>
        </div>
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <TextEditor
          key={`${!selectedProject?.submitted}`}
          editable={!selectedProject?.submitted}
          content={selectedProject?.description}
          onChange={handleChange}
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
