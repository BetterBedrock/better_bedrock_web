import type { Metadata } from "next";
import { ReactNode } from "react";

interface DownloadsSideProjectsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Better Bedrock Side Projects - Community Texture Packs & Addons",
  description: "Explore Better Bedrock official side projects including texture packs, addons, and creative content. Discover unique creations from our better bedrock creators.",
};

export default function DownloadsSideProjectsLayout({
  children,
}: DownloadsSideProjectsLayoutProps) {
  return children;
}
