import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { ProjectDto } from "~/lib/api";

interface HeroHeaderProps {
  project: ProjectDto;
}

export const HeroHeader = ({ project }: HeroHeaderProps) => (
  <div>
    <div className={styles.header}>
      <BedrockText type="h1" text="DOWNLOADING" color="white" font="MinecraftTen" />
    </div>
    <BedrockText type="p" color="white" text={project.title} />
  </div>
);
