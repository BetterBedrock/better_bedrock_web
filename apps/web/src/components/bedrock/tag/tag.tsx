import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => (
  <BedrockText text={name} type="p" textAlign="center" color="black" extraClassName={styles.tag} />
);
