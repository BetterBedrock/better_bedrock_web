"use client";

import clsx from "clsx";
import FullScreen from "@/public/images/full_screen.png";
import { Card, CardDivider } from "@/_components/card";
import { SimpleButton } from "@/_components/simple-button";
import { HeaderTitle } from "@/app/(projects)/project/components/header/header-title";
import { TiptapEditor } from "@/_components/tiptap/editor";
import { DetailedProjectDto } from "@/_lib/api";
import { useEditMode } from "@/app/(projects)/project/components/description/edit-mode/hook/use-edit-mode";
import { SubmittedOverlay } from "@/app/(projects)/project/components/submitted-overlay/submitted-overlay";

import styles from "./edit-mode.module.scss";

interface EditModeProps {
  detailedProject: DetailedProjectDto;
}

export const EditMode = ({ detailedProject }: EditModeProps) => {
  const { handleFullScreen, handleChange, fullScreen } = useEditMode();

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
