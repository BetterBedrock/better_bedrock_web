import { BedrockText } from "@/components/bedrock-text";
import { Card, CardBody } from "@/components/card";
import { UserLinkvertiseInfo } from "./user-linkvertise-info";
import clsx from "clsx";
import { loadUserProfile } from "@/lib/user/load-user-profile";
import { loadUserRating } from "@/lib/user/load-user-rating";
import { UserProfileActions } from "./user-profile-actions";
import { UserProfileName } from "./user-profile-name";
import { UserProfilePicture } from "./user-profile-picture";
import { UserProfileRating } from "./user-profile-rating";

import styles from "./user.module.scss";

interface UserProps {
  params?: { name: string };
}

export async function generateMetadata({ params }: UserProps) {
  const selectedUser = await loadUserProfile(params?.name);
  return {
    title: selectedUser ? `${selectedUser.name} - Profile` : "User Profile",
    description:
      selectedUser.bio ??
      "View the profile of a Better Bedrock user, showcasing their Minecraft PE texture packs, scripts, maps, skins, and more.",
  };
}

export const User = async ({ params }: UserProps) => {
  const selectedUser = await loadUserProfile(params?.name);
  const rating = await loadUserRating(selectedUser.id);

  return (
    <div className={styles.container}>
      <UserLinkvertiseInfo selectedUser={selectedUser} />
      <Card sub>
        <CardBody className={styles.profileCardBody} smallerPadding >
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
        </CardBody>
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
    </div>
  );
};
