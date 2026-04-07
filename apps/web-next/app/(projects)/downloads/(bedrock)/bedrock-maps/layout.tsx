import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockMapsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title:
    "Minecraft Bedrock Maps | Adventure, Survival, Parkour & Minigame Maps",
  description:
    "Download Minecraft Bedrock maps including adventure, survival, parkour, and minigame maps. Explore new worlds and custom creations for Minecraft Bedrock Edition.",
};

export default function DownloadsBedrockMapsLayout({
  children,
}: DownloadsBedrockMapsLayoutProps) {
  return children;
}
