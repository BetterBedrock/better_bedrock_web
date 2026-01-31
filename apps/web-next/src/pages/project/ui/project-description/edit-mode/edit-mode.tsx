"use client";

import clsx from "clsx";
import FullScreen from "@/public/images/full_screen.png";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";
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
    <Card className={clsx(styles.overlay, fullScreen && styles.fullscreen)}>
      {detailedProject.submitted && <SubmittedOverlay />}
      <CardBody>
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
      </CardBody>
      <CardDivider />
      <CardBody>
        <TiptapEditor
          detailedProject={detailedProject}
          key={`${!detailedProject.submitted}`}
          content={detailedProject.description}
          onChange={handleChange}
        />
      </CardBody>
    </Card>
  );
};
