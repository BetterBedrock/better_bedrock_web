import { ProjectDto, SimpleUserDto } from "@/shared/lib/openapi";
import { Avatar } from "@/shared/ui/avatar";
import { BedrockText } from "@/shared/ui/bedrock-text";

interface HeroHeaderProps {
  project: ProjectDto;
  creator: SimpleUserDto;
}

export const HeroHeader = ({ project, creator }: HeroHeaderProps) => (
  <div>
    <BedrockText type="h1" text="DOWNLOADING" color="white" font="Minecraft" />
    <BedrockText
      type="p"
      color="white"
    >
      {`${project.title} by `}
      <Avatar.Details at name={creator.name} />
    </BedrockText>
  </div>
);
