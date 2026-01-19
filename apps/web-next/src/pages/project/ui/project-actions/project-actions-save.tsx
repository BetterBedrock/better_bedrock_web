"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { useActionsSave } from "@/pages/project/model/use-actions-save";

export const ProjectActionsSave = () => {
  const { saveProject } = useActionsSave();

  return (
    <Button
      width="100%"
      height="100%"
      type="green"
      onClick={saveProject}
      center
    >
      <BedrockText text="Save" type="p" color="white" />
    </Button>
  );
};
