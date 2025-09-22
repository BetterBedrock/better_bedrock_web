import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";
import Sumssatsuma from "~/assets/images/avatars/sumssatsuma.png";

interface UserProfilePicture {
    special?: boolean;
}

export const UserProfilePicture = ({special}: UserProfilePicture) => <img src={special ? Sumssatsuma : Steve} className={styles.image} />;
