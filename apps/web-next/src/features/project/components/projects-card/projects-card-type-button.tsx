"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { useProjectsCardSearch } from "../../providers/projects-card-search";
import { SearchProjectTypeKey } from "@/public/content/better-bedrock";

interface ProjectsCardTypeButtonProps {
  selectedKey: string;
  label: string;
}

export const ProjectsCardTypeButton = ({
  selectedKey,
  label,
}: ProjectsCardTypeButtonProps) => {
  const { selectedType, setSelectedType } = useProjectsCardSearch();

  return (
    <Button
      type={selectedKey === selectedType ? "green" : "white"}
      onClick={() => setSelectedType(selectedKey as SearchProjectTypeKey)}
      isClicked={selectedKey === selectedType}
      isToggled={selectedKey === selectedType}
      center
    >
      <BedrockText
        text={label}
        color={selectedKey === selectedType ? "white" : "black"}
        type="p"
      />
    </Button>
  );
};
