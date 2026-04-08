"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { useState, useEffect } from "react";

interface ModCardActionsToggleProps {
  defaultEnabled: boolean;
  onChange?: (enabled: boolean) => void;
}

export const ModCardActionsToggle = ({
  defaultEnabled,
  onChange,
}: ModCardActionsToggleProps) => {
  const [enabled, setEnabled] = useState(defaultEnabled);

  useEffect(() => {
    setEnabled(defaultEnabled);
  }, [defaultEnabled]);

  const handleClick = () => {
    onChange?.(!enabled);
    setEnabled((prev) => !prev);
  };

  return (
    <Button
      width="100%"
      type={enabled ? "green" : "red"}
      center
      onClick={handleClick}
    >
      <BedrockText color="white">
        {enabled ? "Enabled" : "Disabled"}
      </BedrockText>
    </Button>
  );
};
