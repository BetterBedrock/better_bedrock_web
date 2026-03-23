import { ProjectsCardSearchProvider } from "@/pages/downloads";
import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockSkinPacksLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Minecraft Bedrock Skins & Skin Packs | Download Custom Skins",
  description:
    "Download Minecraft Bedrock skins and skin packs. Customize your character with cool, cute, HD, and themed skins for Minecraft Bedrock Edition.",
};

export default function DownloadsBedrockSkinPacksLayout({
  children,
}: DownloadsBedrockSkinPacksLayoutProps) {
  return (
    <ProjectsCardSearchProvider defaultType="skinPacks">
      {children}
    </ProjectsCardSearchProvider>
  );
}
