import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

interface UserProfileNameProps {
  name: string;
  banned: boolean;
}

export const UserProfileName = ({ name, banned }: UserProfileNameProps) => (
  <div className={styles.name}>
    <BedrockText type="h1" text={name} color="white" textAlign="left" font="Minecraft" extraClassName={styles.user}/>
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
