import { ProjectsCardSearchProvider } from "@/pages/downloads";
import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockOtherLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Minecraft Bedrock Mods, Shaders, Seeds, UI Packs & More",
  description:
    "Discover Minecraft Bedrock shaders, UI packs, seeds, tools, and other content. Find more ways to customize Minecraft Bedrock Edition.",
};

export default function DownloadsBedrockOtherLayout({
  children,
}: DownloadsBedrockOtherLayoutProps) {
  return (
    <ProjectsCardSearchProvider defaultType="other">
      {children}
    </ProjectsCardSearchProvider>
  );
}
