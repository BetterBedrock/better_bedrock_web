import { BedrockText } from "@/_components/bedrock-text";

import { styles } from ".";

interface HeadingDescriptionProps {
  description: string;
}

export const HeadingDescription = ({ description }: HeadingDescriptionProps) => (
  <BedrockText
    extraClassName={styles.description}
    type="p"
    textAlign="center"
    color="white"
    text={description}
  />
);
