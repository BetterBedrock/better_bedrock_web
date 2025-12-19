"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { useActionsSave } from "@/app/(projects)/project/components/actions/hooks/use-actions-save";

export const ActionsSave = () => {
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
