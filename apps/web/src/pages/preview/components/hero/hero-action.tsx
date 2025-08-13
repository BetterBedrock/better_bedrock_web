import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";

interface HeroActionProps {
  ref: React.RefObject<HTMLButtonElement | null>;
  setShowPopup: (value: React.SetStateAction<boolean>) => void;
}

export const HeroAction = ({ ref, setShowPopup }: HeroActionProps) => (
  <Button
    ref={ref}
    id="download"
    className={styles.action}
    width="100%"
    type="green"
    onClick={() => setShowPopup((prev) => !prev)}
    center
  >
    <BedrockText text="Download" type="p" color="white" />
  </Button>
);
