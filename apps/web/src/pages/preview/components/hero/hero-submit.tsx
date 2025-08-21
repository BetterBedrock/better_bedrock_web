import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";

export const HeroSubmit = () => (
  <Button className={styles.action} width="100%" type="dark" center>
    <BedrockText text="Submit For Review" type="p" color="white" />
  </Button>
);
