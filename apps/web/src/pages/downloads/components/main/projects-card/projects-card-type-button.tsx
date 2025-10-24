import { SearchProjectTypeKey } from "~/assets/content/better-bedrock";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

import { useProjectsCardSearch } from ".";

interface ProjectsCardTypeButtonProps {
  key: string;
  label: string;
}

export const ProjectsCardTypeButton = ({ key, label }: ProjectsCardTypeButtonProps) => {
  const { selectedType, setSelectedType } = useProjectsCardSearch();

  return (
    <Button
      type={key === selectedType ? "green" : "white"}
      onClick={() => setSelectedType(key as SearchProjectTypeKey)}
      isClicked={key === selectedType}
      isToggled={key === selectedType}
      center
    >
      <BedrockText text={label} color={key === selectedType ? "white" : "black"} type="p" />
    </Button>
  );
};
