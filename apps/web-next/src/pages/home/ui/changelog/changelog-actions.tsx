import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group/button-group";

import styles from "./changelog.module.scss";

export const ChangelogActions = () => (
  <ButtonGroup className={styles.actions}>
    <Button
      width="100%"
      height="auto"
      type="green"
      // onClick={() => navigate(Routes.INFORMATION)}
      center
    >
      <BedrockText type="p" text="Information Page" color="white" />
    </Button>
    <Button
      width="100%"
      height="auto"
      type="white"
      // onClick={() =>
      //   window.open(
      //     "https://discord.gg/ZGK5WYXnEY",
      //     "_blank",
      //     "noopener,noreferrer"
      //   )
      // }
      center
    >
      <BedrockText type="p" text="Join Discord" color="black" />
    </Button>
  </ButtonGroup>
);
