import { BedrockText } from "@/components/bedrock-text";

import styles from "./header.module.scss";

interface HeadingDescriptionProps {
  description: string;
}

export const HeadingDescription = ({
  description,
}: HeadingDescriptionProps) => (
  <BedrockText
    extraClassName={styles.description}
    type="p"
    textAlign="center"
    color="white"
    text={description}
  />
);
