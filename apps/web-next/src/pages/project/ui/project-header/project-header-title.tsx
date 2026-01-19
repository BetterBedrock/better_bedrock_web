import { BedrockText } from "@/shared/ui/bedrock-text";
import styles from "./project-header.module.scss";

interface ProjectHeaderTitleProps {
  title: string;
}

export const ProjectHeaderTitle = ({ title }: ProjectHeaderTitleProps) => (
  <BedrockText
    text={title}
    type="h2"
    textAlign="start"
    color="white"
    font="Minecraft"
    extraClassName={styles.text}
  />
);
