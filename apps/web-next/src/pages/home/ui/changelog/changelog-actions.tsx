import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Link } from "@/shared/ui/link";

import styles from "./changelog.module.scss";
import { Routes } from "@/shared/lib/utils";

export const ChangelogActions = () => (
  <ButtonGroup className={styles.actions}>
    <Link
      link="https://discord.gg/ZGK5WYXnEY"
      isExternalLink
      hideStyles
      className={styles.link}
    >
      <Button width="100%" height="auto" type="green" center>
        <BedrockText text="Join Discord" color="white" type="p" />
      </Button>
    </Link>
    <Link link={Routes.INFORMATION} hideStyles className={styles.link}>
      <Button width="100%" height="auto" type="white" center>
        <BedrockText text="Information Page" color="black" type="p" />
      </Button>
    </Link>
  </ButtonGroup>
);
