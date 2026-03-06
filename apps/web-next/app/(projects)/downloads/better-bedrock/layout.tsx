import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBetterBedrockLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Better Bedrock Official Downloads - Extensions & Texture Packs",
  description: "Download official Better Bedrock extensions, texture packs, and curated mods. Enhance your Minecraft Bedrock experience with our official collection.",
};

export default function DownloadsBetterBedrockLayout({ children }: DownloadsBetterBedrockLayoutProps) {
  return children;
}
