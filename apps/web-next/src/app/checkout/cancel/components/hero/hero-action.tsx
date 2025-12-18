import { Link } from "@/_components/link";
import { Routes } from "@/utils/routes";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";

import styles from "./hero.module.scss";

export const HeroAction = () => (
  <Link link={Routes.HOME} hideStyles>
    <Button width="100%" type="green" className={styles.return} center>
      <BedrockText text="Return to Home" type="p" color="white" />
    </Button>
  </Link>
);
