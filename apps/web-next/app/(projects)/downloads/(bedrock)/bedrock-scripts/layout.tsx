import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsBedrockScriptsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Minecraft Bedrock Scripts | Behavior Packs & Script API",
  description:
    "Download Minecraft Bedrock scripts and behavior packs using the Script API. Add custom mechanics, commands, automation, and server features to Minecraft Bedrock Edition.",
};

export default function DownloadsBedrockScriptsLayout({
  children,
}: DownloadsBedrockScriptsLayoutProps) {
  return children;
}
