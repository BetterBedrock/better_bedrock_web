"use client";

import clsx from "clsx";
import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group/button-group";
import { Collapsible } from "@/components/collapsible";
import { ProjectType } from "@/lib/api";
import { PROJECT_TYPES } from "@/public/content/better-bedrock";
import { useDetailsEditorProjectType } from "@/features/project/hooks/use-details-editor-project-type";

import styles from "./details-editor.module.scss";

export const DetailsEditorProjectType = () => {
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
