import { styles } from ".";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

export const HeroActions = () => (
  <div className={styles.actions}>
    <ButtonGroup direction="responsive">
      <Link link={Routes.DOWNLOADS_MAIN} className={styles.link}>
        <Button width="100%" type="green" center>
          <BedrockText text="Downloads" type="p" color="white" />
        </Button>
      </Link>
      <Link link={Routes.CREATE} className={styles.link}>
        <Button width="100%" type="white" center>
          <BedrockText text="Create A Project" type="p" color="black" />
        </Button>
      </Link>
    </ButtonGroup>
  </div>
);
