import { User } from "./components/user/user";
import { Section } from "@/components/section";
import { Tabs } from "@/app/(users)/profile/[name]/components/tabs/tabs";
import { ReactNode } from "react";

import styles from "./profile.module.scss";

interface ProfileLayout {
  children: ReactNode;
  params?: { name: string };
}

export const ProfileSection = async ({ children, params }: ProfileLayout) => (
  <Section className={styles.background} extraClassName={styles.padding} fixed>
    <div className={styles.wrapper}>
      <User params={params} />
      <Tabs params={params} />
      {children}
    </div>
  </Section>
);
