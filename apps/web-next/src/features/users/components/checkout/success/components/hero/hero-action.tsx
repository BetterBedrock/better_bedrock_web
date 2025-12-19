import { Button } from "@/components/button";
import { Routes } from "@/utils/routes";
import { BedrockText } from "@/components/bedrock-text";
import { Link } from "@/components/link";

import styles from "./hero.module.scss";

export const HeroAction = () => (
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
