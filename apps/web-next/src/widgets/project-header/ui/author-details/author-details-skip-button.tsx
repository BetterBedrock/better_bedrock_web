import { BedrockText } from "@/shared/ui/bedrock-text";

import styles from "./author-details.module.scss";
import { Link } from "@/shared/ui/link";

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
