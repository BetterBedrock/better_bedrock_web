import { ReactNode } from "react";
import { AnalyticsProvider } from "@/providers/analytics";
import { Section } from "@/components/section";

import { Tabs } from "@/features/users/components/profile/tabs/tabs";
import { User } from "@/features/users/components/profile/user/user";

import { notFound } from "next/navigation";
import { fetchUserByName } from "@/lib/user";
import styles from "./profile.module.scss";

interface ProfileProps {
  children: ReactNode;
  params?: Promise<{ name: string }>;
}

export const generateMetadata = async ({ params }: ProfileProps) => {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const name = loadedParams.name;

  const user = await fetchUserByName(name);

  if (!user) {
    notFound();
  }

  const title = user.name;
  const description =
    user.bio ??
    "The best texture packs, scripts, maps, skins, and more for Minecraft PE on Better Bedrock.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
};

export default async function LayoutProfile({
  children,
  params,
}: ProfileProps) {
  const resolvedParams = await params;

  return (
    <AnalyticsProvider>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
      >
        <div className={styles.wrapper}>
          <User params={resolvedParams} />
          <Tabs params={resolvedParams} />
          {children}
        </div>
      </Section>
    </AnalyticsProvider>
  );
}
