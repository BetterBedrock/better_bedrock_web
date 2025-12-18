import { Button } from "@/_components/button";
import { Routes } from "@/utils/routes";
import { BedrockText } from "@/_components/bedrock-text";
import { Link } from "@/_components/link";

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
