import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group/button-group";

import { Routes } from "@/utils/routes";
import { Link } from "@/components/link";

import styles from "./hero.module.scss";

export const HeroActions = () => {
  return (
    <ButtonGroup className={styles.actions}>
      <Link link={Routes.HOME}>
        <Button width="100%" height="auto" type="green" center>
          <BedrockText text="Home Page" color="white" type="p" />
        </Button>
      </Link>
      <Link link={Routes.INFORMATION}>
        <Button width="100%" height="auto" type="white" center>
          <BedrockText text="Information Page" color="black" type="p" />
        </Button>
      </Link>
    </ButtonGroup>
  );
};
