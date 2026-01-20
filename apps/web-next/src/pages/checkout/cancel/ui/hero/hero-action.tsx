import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/model/routes";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";

import styles from "./hero.module.scss";

export const HeroAction = () => (
  <Link link={Routes.HOME} hideStyles>
    <Button width="100%" type="green" className={styles.return} center>
      <BedrockText text="Return to Home" type="p" color="white" />
    </Button>
  </Link>
);
