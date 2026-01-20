import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./downloads-header.module.scss";

interface DownloadsHeadingDescriptionProps {
  description: string;
}

export const DownloadsHeadingDescription = ({
  description,
}: DownloadsHeadingDescriptionProps) => (
  <BedrockText
    extraClassName={styles.description}
    type="p"
    textAlign="center"
    color="white"
    text={description}
  />
);
