"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { InputSwitch } from "@/shared/ui/input";
import { useDetailsEditorBetterBedrockContent } from "../../model/use-details-editor-better-bedrock-content";
import { Card } from "@/shared/ui/card";

export const ProjectDetailsEditorBetterBedrockContent = () => {
  const { handleSwitchBetterBedrock, selectedProject } =
    useDetailsEditorBetterBedrockContent();

  return (
    <Card.Item>
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
    </Card.Item>
  );
};
