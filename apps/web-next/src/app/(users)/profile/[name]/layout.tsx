import { ReactNode } from "react";
import { AnalyticsProvider } from "@/providers/analytics";
import { Section } from "@/components/section";

import { Tabs } from "@/features/users/components/profile/tabs/tabs";
import { User } from "@/features/users/components/profile/user/user";

import styles from "./profile.module.scss";

interface ProfileProps {
  children: ReactNode;
  params?: Promise<{ name: string }>;
}

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
