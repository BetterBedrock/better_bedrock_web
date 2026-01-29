import { ProjectDto, SimpleUserDto } from "@/shared/lib/openapi";
import { BedrockText } from "@/shared/ui/bedrock-text";

interface HeroHeaderProps {
  project: ProjectDto;
  creator: SimpleUserDto;
}

export const HeroHeader = async ({ project, creator }: HeroHeaderProps) => (
  <div>
    <BedrockText type="h1" text="DOWNLOADING" color="white" font="Minecraft" />
    <BedrockText
      type="p"
      color="white"
      text={`${project.title} by @${creator.name}`}
    />
  </div>
);
