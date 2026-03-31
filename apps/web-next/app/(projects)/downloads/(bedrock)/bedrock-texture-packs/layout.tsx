import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockTexturePacksLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Minecraft Bedrock Texture Packs | Resource Packs Download",
  description:
    "Download Minecraft Bedrock texture packs and resource packs. Improve graphics, change textures, and customize the look of Minecraft Bedrock Edition with high-quality packs.",
};

export default function DownloadsBedrockTexturePacksLayout({
  children,
}: DownloadsBedrockTexturePacksLayoutProps) {
  return children;
}
