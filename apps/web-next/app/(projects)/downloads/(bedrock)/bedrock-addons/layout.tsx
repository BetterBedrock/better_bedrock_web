import { ProjectsCardSearchProvider } from "@/pages/downloads";
import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockModsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Minecraft Bedrock Addons | Mods & Add-Ons Download",
  description:
    "Download the best Minecraft Bedrock addons and mods. Add new mobs, items, biomes, and gameplay features to Minecraft Bedrock Edition with free add-ons.",
};

export default function DownloadsBedrockModsLayout({
  children,
}: DownloadsBedrockModsLayoutProps) {
  return <ProjectsCardSearchProvider defaultType="addons">{children}</ProjectsCardSearchProvider>;
}
