import { Button } from "@/shared/ui/button";
import { Routes } from "@/shared/lib/utils";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Link } from "@/shared/ui/link";

import styles from "./hero-success-page.module.scss";

export const HeroSuccessPageAction = () => (
  <Link link={Routes.HOME} hideStyles>
    <Button
      width="100%"
      height="auto"
      className={styles.return}
      type="green"
      center
    >
      <BedrockText text="Return to Home" type="p" color="white" />
    </Button>
  </Link>
);
