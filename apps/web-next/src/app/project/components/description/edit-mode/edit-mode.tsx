"use client";

import clsx from "clsx";
import FullScreen from "@/public/images/full_screen.png";
import { Card, CardDivider } from "@/_components/card";
import { SimpleButton } from "@/_components/simple-button";
import { HeaderTitle } from "@/app/project/components/header";
import { SubmittedOverlay } from "@/app/project/components/submitted-overlay";

import { styles, useEditMode } from ".";
import { TiptapEditor } from "@/_components/tiptap/editor";
import { DetailedProjectDto } from "@/_lib/api";

interface EditModeProps {
  detailedProject: DetailedProjectDto;
}

export const EditMode = ({ detailedProject }: EditModeProps) => {
  const { handleFullScreen, handleChange, fullScreen } = useEditMode();

  console.log("Render EditMode");
  return (
    <Card sub className={clsx(styles.overlay, fullScreen && styles.fullscreen)}>
      {detailedProject.submitted && <SubmittedOverlay />}
      <div className={styles.editor}>
        <div className={styles.title}>
          <HeaderTitle title="Description" />
          <SimpleButton
            transparent
            onClick={handleFullScreen}
            className={styles.mode}
          >
            <img src={FullScreen.src} className={styles.icon} />
          </SimpleButton>
        </div>
      </div>
      <CardDivider sub />
      <div className={styles.editor}>
        <TiptapEditor
          detailedProject={detailedProject}
          key={`${!detailedProject.submitted}`}
          content={detailedProject.description}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
};
