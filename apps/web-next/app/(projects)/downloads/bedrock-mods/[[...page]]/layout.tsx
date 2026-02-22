import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockModsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Minecraft Bedrock Mods, Texture Packs, Maps, Skins & More",
  description:
    "Discover and download the best Minecraft Bedrock mods, addons, and modifications. Browse our extensive collection of quality content for Bedrock Edition.",
};

export default function DownloadsBedrockModsLayout({
  children,
}: DownloadsBedrockModsLayoutProps) {
  return children;
}
