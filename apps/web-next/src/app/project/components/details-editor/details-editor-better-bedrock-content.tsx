"use client";

import clsx from "clsx";
import { BedrockText } from "@/_components/bedrock-text";
import { CardDivider } from "@/_components/card";
import { InputSwitch } from "@/_components/input/input-switch";

import { styles, useDetailsEditorBetterBedrockContent } from ".";

export const DetailsEditorBetterBedrockContent = () => {
  const { handleSwitchBetterBedrock, selectedProject } = useDetailsEditorBetterBedrockContent();

  return (
    <>
      <CardDivider sub />
      <div className={clsx(styles.editor, styles.size)}>
        <BedrockText text="Better Bedrock Content" type="p" color="white" textAlign="left" />

        <InputSwitch
          placeholder="Better Bedrock Content"
          checked={selectedProject!.betterBedrockContent}
          onChange={handleSwitchBetterBedrock}
        />
      </div>
    </>
  );
};
