import { BedrockText } from "@/_components/bedrock-text";

import styles from "./user.module.scss";

interface UserProfileNameProps {
  name: string;
  banned: boolean;
}

export const UserProfileName = ({ name, banned }: UserProfileNameProps) => (
  <div className={styles.name}>
    <BedrockText type="h1" text={name} color="white" textAlign="left" font="Minecraft" extraClassName={styles.wrap}/>
    {banned && (
      <BedrockText
        type="h2"
        text="(banned)"
        textAlign="left"
        font="Minecraft"
        extraClassName={styles.banned}
      />
    )}
  </div>
);
