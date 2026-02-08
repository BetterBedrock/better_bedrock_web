"use client"

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";

interface TutorialActionsProps {
  selectedProvider: 'linkvertise' | 'lootlabs';
  onProviderChange: (provider: 'linkvertise' | 'lootlabs') => void;
}

export const TutorialActions = ({ selectedProvider, onProviderChange }: TutorialActionsProps) => (
  <ButtonGroup>
    <Button
      width="100%"
      height="auto"
      type={"dark"}
      center
      isClicked={selectedProvider === "lootlabs"}
      onClick={() => onProviderChange('lootlabs')}
    >
      <BedrockText text="Lootlabs (Increase revenue)" color={"white"} type="p" />
    </Button>
    <Button
      width="100%"
      height="auto"
      type={"dark"}
      center
      isClicked={selectedProvider === "linkvertise"}
      onClick={() => onProviderChange('linkvertise')}
    >
      <BedrockText text="Linkvertise" color={"white"} type="p" />
    </Button>
  </ButtonGroup>
);
