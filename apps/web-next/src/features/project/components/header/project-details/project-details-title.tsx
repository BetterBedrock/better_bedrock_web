import { BedrockText } from "@/components/bedrock-text";
import { DetailedProjectDto } from "@/lib/api";

import styles from "./project-details.module.scss";

interface ProjectDetailsTitleProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectDetailsTitle = ({
  detailedProject,
}: ProjectDetailsTitleProps) => (
  <BedrockText
    text={detailedProject?.title ?? ""}
    type="h1"
    textAlign="start"
    color="white"
    font="Minecraft"
    extraClassName={styles.text}
  />
);
