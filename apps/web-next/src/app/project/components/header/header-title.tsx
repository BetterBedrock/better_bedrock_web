import { BedrockText } from "@/_components/bedrock-text";
import { styles } from ".";

interface HeaderTitleProps {
  title: string;
}

export const HeaderTitle = ({ title }: HeaderTitleProps) => (
  <BedrockText
    text={title}
    type="h2"
    textAlign="start"
    color="white"
    font="Minecraft"
    extraClassName={styles.text}
  />
);
