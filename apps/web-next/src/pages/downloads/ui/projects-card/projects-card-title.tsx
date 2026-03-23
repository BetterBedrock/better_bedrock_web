import { PROJECT_TYPES } from "@/shared/config";
import { ProjectType } from "@/shared/lib/openapi";
import { BedrockText } from "@/shared/ui/bedrock-text";

interface ProjectsCardTitleProps {
  type?: ProjectType;
}

export const ProjectsCardTitle = ({ type }: ProjectsCardTitleProps) => (
  <BedrockText
    text={`Minecraft Bedrock ${type ? PROJECT_TYPES[type] : "Mods"}`}
    type="h1"
    color="white"
    font="Minecraft"
    textAlign="start"
    headerSize
  />
);
