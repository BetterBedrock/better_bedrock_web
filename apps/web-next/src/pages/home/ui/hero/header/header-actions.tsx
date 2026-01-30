import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import Link from "next/link";
import { Routes } from "@/shared/lib/utils";

import styles from "./header.module.scss";

export const HeroActions = () => (
  <div className={styles.actions}>
    <ButtonGroup direction="responsive">
      <Link href={Routes.DOWNLOADS_MAIN} className={styles.link}>
        <Button width="100%" type="green" center>
          <BedrockText text="Explore Projects" type="p" color="white" />
        </Button>
      </Link>
      <Link href={Routes.DOWNLOADS_BETTERBEDROCK} className={styles.link}>
        <Button width="100%" type="white" center>
          <BedrockText text="Get Better Bedrock" type="p" color="black" />
        </Button>
      </Link>
    </ButtonGroup>
  </div>
);
