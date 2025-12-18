"use client";

import clsx from "clsx";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Collapsible } from "@/_components/collapsible";
import { ProjectType } from "@/_lib/api";
import { PROJECT_TYPES } from "@/public/content/better-bedrock";
import { useDetailsEditorProjectType } from "@/app/project/components/details-editor/hooks/use-details-editor-project-type";

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
