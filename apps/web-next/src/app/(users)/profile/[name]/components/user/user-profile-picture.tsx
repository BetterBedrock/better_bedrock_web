import { Avatar } from "@/components/avatar";

import styles from "./user.module.scss";

interface UserProfilePicture {
  name: string;
}

export const UserProfilePicture = ({ name }: UserProfilePicture) => (
  <Avatar.Profile className={styles.image} name={name} />
);
