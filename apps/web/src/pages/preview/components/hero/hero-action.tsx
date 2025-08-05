import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";

interface HeroActionProps {
  setShowPopup: (value: React.SetStateAction<boolean>) => void;
}

export const HeroAction = ({ setShowPopup }: HeroActionProps) => (
  <Button
    className={styles.action}
    width="100%"
    type="green"
    onClick={() => setShowPopup((prev) => !prev)}
    center
  >
    <BedrockText text="Download" type="p" color="white" />
  </Button>
);
