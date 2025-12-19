"use server";

import { ProjectDto } from "@/lib/api";
import { BedrockText } from "@/components/bedrock-text";

import styles from "./hero.module.scss";

interface HeroHeaderProps {
  project: ProjectDto;
}

export const HeroHeader = async ({ project }: HeroHeaderProps) => (
  <div>
    <div className={styles.header}>
      <BedrockText
        type="h1"
        text="DOWNLOADING"
        color="white"
        font="Minecraft"
      />
    </div>
    <BedrockText type="p" color="white" text={project.title} />
  </div>
);
