import { User } from "./components/user";
import { Section } from "@/_components/section";
import { Tabs } from "@/app/profile/[name]/components/tabs";
import { ReactNode } from "react";

import styles from "./profile.module.scss";
import { loadUserProfile } from "@/_lib/user/load-user-profile";
import { loadUserRating } from "@/_lib/user/load-user-rating";

interface ProfileLayout {
  children: ReactNode;
  params?: { name: string };
}

export const ProfileSection = async ({ children, params }: ProfileLayout) => {
  const user = await loadUserProfile(params?.name);
  const rating = await loadUserRating(params?.name);

  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center={!user}
    >
      <div className={styles.wrapper}>
        <User selectedUser={user} rating={rating} />
        <Tabs params={params} />
        {children}
      </div>
    </Section>
  );
};
