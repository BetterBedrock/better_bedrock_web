"use client";

import clsx from "clsx";
import FullScreen from "@/public/images/full_screen.png";
import { Card, CardDivider } from "@/shared/ui/card";
import { SimpleButton } from "@/shared/ui/simple-button";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { TiptapEditor } from "../tiptap/editor";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { useEditMode } from "../../../model/use-edit-mode";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";

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
          <ProjectHeaderTitle title="Description" />
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
