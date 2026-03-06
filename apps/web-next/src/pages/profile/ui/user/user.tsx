import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";
import { UserLinkvertiseInfo } from "./user-linkvertise-info";
import clsx from "clsx";
import { UserProfileActions } from "./user-profile-actions";
import { UserProfileName } from "./user-profile-name";
import { UserProfilePicture } from "./user-profile-picture";
import { UserProfileRating } from "./user-profile-rating";

import { loadUserProfile, loadUserRating } from "@/entities/user";

import styles from "./user.module.scss";
import { UserNewsInfo } from "./user-news-info";

interface UserProps {
  params?: { name: string };
}

export const generateMetadata = async ({ params }: UserProps) => {
  const name = decodeURIComponent(params?.name ?? "");
  const selectedUser = await loadUserProfile(name);
  return {
    title: selectedUser ? `${selectedUser.name} - Profile` : "User Profile",
    description:
      selectedUser.bio ??
      "View the profile of a Better Bedrock user, showcasing their Minecraft PE texture packs, scripts, maps, skins, and more.",
  };
};

export const User = async ({ params }: UserProps) => {
  const name = decodeURIComponent(params?.name ?? "");
  const selectedUser = await loadUserProfile(name);
  const rating = await loadUserRating(selectedUser.id);

  return (
    <div className={styles.container}>
      <UserNewsInfo selectedUser={selectedUser} />
      <UserLinkvertiseInfo selectedUser={selectedUser} />
      <Card sub>
        <Card.Body>
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
        </Card.Body>
      </Card>
    </div>
  );
};
