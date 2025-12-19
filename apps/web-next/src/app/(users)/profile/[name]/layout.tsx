import { ReactNode } from "react";
import { AnalyticsProvider } from "@/providers/analytics";
import { ProfileSection } from "@/app/(users)/profile/[name]/profile-section";

interface ProfileProps {
  children: ReactNode;
  params?: Promise<{ name: string }>;
}

export default async function LayoutProfile({
  children,
  params,
}: ProfileProps) {
  return (
    <AnalyticsProvider>
      <ProfileSection params={await params}>{children}</ProfileSection>
    </AnalyticsProvider>
  );
}
