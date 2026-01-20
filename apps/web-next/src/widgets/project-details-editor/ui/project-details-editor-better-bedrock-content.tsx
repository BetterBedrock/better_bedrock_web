"use client";

import clsx from "clsx";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { CardDivider } from "@/shared/ui/card";
import { InputSwitch } from "@/shared/ui/input/input-switch";
import { useDetailsEditorBetterBedrockContent } from "@/widgets/project-details-editor/model/use-details-editor-better-bedrock-content";

import styles from "./project-details-editor.module.scss";

export const ProjectDetailsEditorBetterBedrockContent = () => {
  const { handleSwitchBetterBedrock, selectedProject } =
    useDetailsEditorBetterBedrockContent();

  return (
    <>
      <CardDivider sub />
      <div className={clsx(styles.editor, styles.size)}>
        <BedrockText
          text="Better Bedrock Content"
          type="p"
          color="white"
          textAlign="left"
        />

        <InputSwitch
          placeholder="Better Bedrock Content"
          checked={selectedProject!.betterBedrockContent}
          onChange={handleSwitchBetterBedrock}
        />
      </div>
    </>
  );
};
