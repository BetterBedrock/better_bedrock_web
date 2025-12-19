import { BedrockText } from "@/components/bedrock-text";

import styles from "./author-details.module.scss";
import { Link } from "@/components/link";

export const AuthorDetailsSkipButton = () => (
  <Link link="#download" className={styles.smooth}>
    <BedrockText
      text="Skip to download"
      type="p"
      color="white"
      extraClassName={styles.skip}
    />
  </Link>
);
