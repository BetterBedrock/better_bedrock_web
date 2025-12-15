"use server";

import { BedrockText } from "@/_components/bedrock-text";
import { Card } from "@/_components/card";
import { UserLinkvertiseInfo } from "@/app/profile/[name]/components/user/user-linkvertise-info";

import {
  styles,
  UserProfileActions,
  UserProfileName,
  UserProfilePicture,
  UserProfileRating,
} from ".";

import clsx from "clsx";
import { loadUserProfile } from "@/_lib/user/load-user-profile";
import { loadUserRating } from "@/_lib/user/load-user-rating";

interface UserProps {
  params?: { name: string };
}

export async function generateMetadata({ params }: UserProps) {
  const selectedUser = await loadUserProfile(params?.name);
  return {
    title: selectedUser ? `${selectedUser.name} - Profile` : "User Profile",
    description: selectedUser.bio ?? "View the profile of a Better Bedrock user, showcasing their Minecraft PE texture packs, scripts, maps, skins, and more.",
  };
}

export const User = async ({ params }: UserProps) => {
  const selectedUser = await loadUserProfile(params?.name);
  const rating = await loadUserRating(params?.name);

  return (
    <>
      <UserLinkvertiseInfo selectedUser={selectedUser} />
      <Card className={styles.card}>
        <div className={styles.profile}>
          <UserProfilePicture name={selectedUser!.name} />
          <div className={styles.info}>
            <div className={styles.header}>
              <UserProfileName
                name={selectedUser!.name}
                banned={selectedUser!.banned}
              />
              <UserProfileActions selectedUser={selectedUser} />
            </div>
            <UserProfileRating rating={rating} />
            <BedrockText
              type="p"
              text={selectedUser!.bio}
              color="white"
              textAlign="left"
              extraClassName={clsx(styles.text, styles.wrap)}
            />
          </div>
        </div>
        <div className={styles.bio}>
          <BedrockText
            type="p"
            text={selectedUser!.bio}
            color="white"
            textAlign="left"
            extraClassName={styles.wrap}
          />
        </div>
      </Card>
    </>
  );
};
