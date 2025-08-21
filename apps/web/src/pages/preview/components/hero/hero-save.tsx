import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";

interface HeroSaveProps {
  onClick: () => Promise<void>;
}

export const HeroSave = ({ onClick }: HeroSaveProps) => (
  <Button className={styles.action} width="100%" type="green" onClick={onClick} center>
    <BedrockText text="Save" type="p" color="white" />
  </Button>
);
