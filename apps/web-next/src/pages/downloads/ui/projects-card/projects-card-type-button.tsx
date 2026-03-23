"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { SearchProjectTypeKey } from "@/shared/config";
import { useProjectsCardSearch } from "@/pages/downloads/model/projects-card-search";
import { Link } from "@/shared/ui/link";

interface ProjectsCardTypeButtonProps {
  selectedKey: SearchProjectTypeKey;
  label: string;
}

export const ProjectsCardTypeButton = ({
  selectedKey,
  label,
}: ProjectsCardTypeButtonProps) => {
  const { selectedType, setSelectedType } = useProjectsCardSearch();

  const mappedTypes = {
    all: "mods",
    texturepacks: "texture-packs",
    addons: "addons",
    scripts: "scripts",
    maps: "maps",
    skinPacks: "skin-packs",
    other: "other",
  };

  return (
    <Link link={`bedrock-${mappedTypes[selectedKey]}`} hideStyles>
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
    </Link>
  );
};
