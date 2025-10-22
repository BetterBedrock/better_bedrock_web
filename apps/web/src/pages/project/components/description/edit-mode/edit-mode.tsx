import clsx from "clsx";
import { Card, CardDivider } from "~/components/bedrock/card";
import { SimpleButton } from "~/components/bedrock/simple-button";
import { TextEditor } from "~/components/text-editor";
import { HeaderTitle } from "~/pages/project/components/header";
import { SubmittedOverlay } from "~/pages/project/components/submitted-overlay";
import FullScreen from "~/assets/images/full_screen.png";

import { styles, useEditMode } from ".";

export const EditMode = () => {
  const { handleFullScreen, handleChange, fullScreen, selectedProject } = useEditMode();

  return (
    <Card sub className={clsx(styles.overlay, fullScreen && styles.fullscreen)}>
      {selectedProject!.submitted && <SubmittedOverlay />}
      <div className={styles.editor}>
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
  );
};
