import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Link } from "@/_components/link";
import { Routes } from "@/utils/routes";

import { styles } from ".";

export const NotFoundActions = () => (
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
