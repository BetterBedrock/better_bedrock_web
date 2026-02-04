"use client";

import clsx from "clsx";
import FullScreen from "@/public/images/full_screen.png";
import { Card } from "@/shared/ui/card";
import { SimpleButton } from "@/shared/ui/simple-button";
import { ProjectHeaderTitle } from "@/pages/project/ui/project-header";
import { TiptapEditor } from "../tiptap/editor";
import { DetailedProjectDto } from "@/shared/lib/openapi";
import { useEditMode } from "../../../model/use-edit-mode";
import { SubmittedOverlay } from "@/shared/ui/submitted-overlay";

import styles from "./edit-mode.module.scss";
import Image from "next/image";

interface EditModeProps {
  detailedProject: DetailedProjectDto;
}

export const EditMode = ({ detailedProject }: EditModeProps) => {
  const { handleFullScreen, handleChange, fullScreen } = useEditMode();

  return (
    <Card className={clsx(styles.overlay, fullScreen && styles.fullscreen)}>
      {detailedProject.submitted && <SubmittedOverlay />}
      <Card.Body>
        <div className={styles.title}>
          <ProjectHeaderTitle title="Description" />
          <SimpleButton
            transparent
            onClick={handleFullScreen}
            className={styles.mode}
          >
            <Image
              width={24}
              height={24}
              unoptimized
              alt="Full Screen Icon"
              src={FullScreen.src}
              className={styles.icon}
            />
          </SimpleButton>
        </div>
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <TiptapEditor
          detailedProject={detailedProject}
          key={`${!detailedProject.submitted}`}
          content={detailedProject.description}
          onChange={handleChange}
        />
      </Card.Body>
    </Card>
  );
};
