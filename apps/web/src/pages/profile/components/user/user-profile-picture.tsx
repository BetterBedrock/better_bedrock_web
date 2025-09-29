import { styles } from ".";
import { Avatar } from "~/components/avatar";

interface UserProfilePicture {
  name: string;
}

export const UserProfilePicture = ({ name }: UserProfilePicture) => (
  <Avatar.Profile className={styles.image} name={name} />
);
