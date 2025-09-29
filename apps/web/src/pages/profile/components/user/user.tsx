import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Card } from "~/components/bedrock/card";
import {
  styles,
  UserProfileActions,
  UserProfileName,
  UserProfilePicture,
  UserProfileRating,
} from ".";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { UserLinkvertiseInfo } from "~/pages/profile/components/user/user-linkvertise-info";
import { useAuth } from "~/providers/auth";

export const User = () => {
  const { selectedUser, rating } = useUserProfile();
  const { user } = useAuth();

  return (
    <>
      {user?.id === selectedUser?.id && !selectedUser?.linkvertiseId && <UserLinkvertiseInfo />}
      <Card className={styles.card}>
        <div className={styles.profile}>
          <UserProfilePicture name={selectedUser!.name} />
          <div className={styles.info}>
            <div className={styles.header}>
              <UserProfileName name={selectedUser!.name} banned={selectedUser!.banned} />
              <UserProfileActions />
            </div>
            <UserProfileRating rating={rating} />
            <BedrockText type="p" text={selectedUser!.bio} color="white" textAlign="left" extraClassName={styles.text} />
          </div>
        </div>
        <div className={styles.bio}>
          <BedrockText type="p" text={selectedUser!.bio} color="white" textAlign="left" />
        </div>
      </Card>
    </>
  );
};
