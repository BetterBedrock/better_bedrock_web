import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

import { styles } from ".";

export const HeroLoading = () => (
  <div className={styles.hero}>
    <CircularProgressIndicator size="medium" />
  </div>
);
