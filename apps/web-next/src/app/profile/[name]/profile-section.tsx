import { User } from "./components/user";
import { Section } from "@/_components/section";
import { Tabs } from "@/app/profile/[name]/components/tabs";
import { ReactNode } from "react";

import styles from "./profile.module.scss";

interface ProfileLayout {
  children: ReactNode;
  params?: { name: string };
}

export const ProfileSection = async ({ children, params }: ProfileLayout) => (
  <Section className={styles.background} extraClassName={styles.padding} fixed>
    <div className={styles.wrapper}>
      <User params={params}/>
      <Tabs params={params} />
      {children}
    </div>
  </Section>
);
