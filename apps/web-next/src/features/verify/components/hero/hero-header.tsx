"use server";

import { ProjectDto } from "@/lib/api";
import { BedrockText } from "@/components/bedrock-text";

interface HeroHeaderProps {
  project: ProjectDto;
}

export const HeroHeader = async ({ project }: HeroHeaderProps) => (
    <>
      <BedrockText
        type="h1"
        text="DOWNLOADING"
        color="white"
        font="Minecraft"
      />
      <BedrockText
        type="p"
        color="white"
        text={`Project: ${project.title} by @TODO`}
      />
    </>
  );