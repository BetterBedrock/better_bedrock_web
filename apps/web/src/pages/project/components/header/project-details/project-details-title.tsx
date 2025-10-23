import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";

export const ProjectDetailsTitle = () => {
  const { selectedProject } = useProjectManager();

  return (
    <BedrockText
      text={selectedProject?.title ?? ""}
      type="h1"
      textAlign="start"
      color="white"
      font="Minecraft"
      extraClassName={styles.text}
    />
  );
};
