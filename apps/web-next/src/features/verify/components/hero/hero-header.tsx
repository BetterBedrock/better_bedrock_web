"use server";

import { DetailedProjectDto } from "@/lib/api";
import { BedrockText } from "@/components/bedrock-text";

import styles from "./hero.module.scss";

interface HeroHeaderProps {
  project: DetailedProjectDto;
}

export const HeroHeader = async ({ project }: HeroHeaderProps) => {
  const creatorName = project.user?.name ?? "Unknown";
  
  return (
    <div className={styles.header}>
      <BedrockText
        type="h1"
        text="DOWNLOADING"
        color="white"
        font="Minecraft"
      />
      <BedrockText 
        type="p" 
        color="white" 
        text={`${project.title} by @${creatorName ?? "Unknown"}`} 
      />
    </div>
  );
};
