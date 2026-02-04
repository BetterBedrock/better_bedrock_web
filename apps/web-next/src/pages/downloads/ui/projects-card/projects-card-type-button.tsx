"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { SearchProjectTypeKey } from "@/public/content/better-bedrock";
import { useProjectsCardSearch } from "@/pages/downloads/model/projects-card-search";

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
