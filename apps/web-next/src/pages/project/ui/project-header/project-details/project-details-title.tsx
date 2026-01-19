import { BedrockText } from "@/shared/ui/bedrock-text";
import { DetailedProjectDto } from "@/shared/lib/openapi";

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
