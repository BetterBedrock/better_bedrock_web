import { BedrockText } from "@/shared/ui/bedrock-text";
import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";

import styles from "./projects-card.module.scss";

interface ProjectsCardLoaderProps {
  text: string;
}

export const ProjectsCardLoader = ({ text }: ProjectsCardLoaderProps) => {
  return (
    <div className={styles.loader}>
      <CircularProgressIndicator size="small" />
      <BedrockText text={text} color="white" type="p" />
    </div>
  );
};
