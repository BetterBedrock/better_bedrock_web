import { BedrockText } from "@/app/_components/bedrock-text";
import { Button } from "@/app/_components/button";
import { ButtonGroup } from "@/app/_components/button-group/button-group";
import { Routes } from "@/app/utils/routes";
import Link from "next/link";

import { styles } from ".";

export const HeroActions = () => (
  <div className={styles.actions}>
    <ButtonGroup direction="responsive">
      <Link href={Routes.DOWNLOADS_MAIN} className={styles.link}>
        <Button width="100%" type="green" center>
          <BedrockText text="Downloads" type="p" color="white" />
        </Button>
      </Link>
      <Link href={Routes.CREATE} className={styles.link}>
        <Button width="100%" type="white" center>
          <BedrockText text="Create A Project" type="p" color="black" />
        </Button>
      </Link>
    </ButtonGroup>
  </div>
);
