import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

import { styles } from ".";

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
