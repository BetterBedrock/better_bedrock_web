import { Avatar } from "@/_components/avatar";

import { styles } from ".";

interface UserProfilePicture {
  name: string;
}

export const UserProfilePicture = ({ name }: UserProfilePicture) => (
  <Avatar.Profile className={styles.image} name={name} />
);
