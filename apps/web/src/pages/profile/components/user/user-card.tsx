import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Card } from "~/components/bedrock/card";
import { styles, UserProfileActions, UserProfileName, UserProfilePicture, UserProfileRating } from ".";
import { useUserProfile } from "~/pages/profile/providers/user-profile";

export const UserCard = () => {
  const { selectedUser, rating } = useUserProfile();

  return (
    <Card className={styles.profile}>
      <UserProfilePicture special={selectedUser!.name === "sumssatsuma"} />
      <div className={styles.info}>
        <div className={styles.header}>
          <UserProfileName name={selectedUser!.name} banned={selectedUser!.banned} />
          <UserProfileActions />
        </div>
        <UserProfileRating rating={rating} />
        <BedrockText type="p" text={selectedUser!.bio} color="white" textAlign="left" />
      </div>
    </Card>
  );
};
