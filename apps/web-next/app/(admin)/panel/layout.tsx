import { fetchLoggedUser } from "@/entities/auth";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface PanelLayoutProps {
  children: ReactNode;
}

export default async function PanelLayout({ children }: PanelLayoutProps) {
  const user = await fetchLoggedUser();

  if (!user?.admin) {
    notFound();
  }

  return <>{children}</>;
}
