"use client";

import clsx from "clsx";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { ProjectType } from "@/shared/lib/openapi";
import { PROJECT_TYPES } from "@/public/content/better-bedrock";
import { useDetailsEditorProjectType } from "@/pages/project/model/use-details-editor-project-type";

import styles from "./project-details-editor.module.scss";

export const ProjectDetailsEditorProjectType = () => {
  const { handleUpdateType, selectedProject } = useDetailsEditorProjectType();

  const types = Object.entries(PROJECT_TYPES).map(([key, label]) => (
    <Button
      key={key}
      type={key === selectedProject!.type ? "green" : "white"}
      onClick={async () => await handleUpdateType(key)}
      isClicked={key === selectedProject!.type}
      isToggled={key === selectedProject!.type}
      center
    >
      <BedrockText
        text={label}
        color={key === selectedProject!.type ? "white" : "black"}
        type="p"
      />
    </Button>
  ));

  return (
    <div className={clsx(styles.editor, styles.size)}>
      <BedrockText
        text="Project Type"
        type="p"
        color="white"
        textAlign="left"
      />

      <Collapsible
        headerText={PROJECT_TYPES[selectedProject!.type as ProjectType]}
        contentText=""
        floating
        className={styles.types}
        limit={true}
        type="green"
      >
        <ButtonGroup direction="vertical">{types}</ButtonGroup>
      </Collapsible>

      <ButtonGroup direction="horizontal" className={styles.group}>
        {types}
      </ButtonGroup>
    </div>
  );
};
