import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/lib/utils";

import styles from "./hero.module.scss";

export const HeroActions = () => (
  <ButtonGroup className={styles.actions}>
    <Link link={Routes.HOME} hideStyles className={styles.link}>
      <Button width="100%" height="auto" type="green" center>
        <BedrockText text="Home Page" color="white" type="p" />
      </Button>
    </Link>
    <Link link={Routes.INFORMATION} hideStyles className={styles.link}>
      <Button width="100%" height="auto" type="white" center>
        <BedrockText text="Information Page" color="black" type="p" />
      </Button>
    </Link>
  </ButtonGroup>
);
