import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { Button } from "~/components/bedrock/button";

interface CollapsibleButtonProps {
  indexTextRef?: string | number;
  headerText: string;
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollapsibleButton = ({
  isCollapsed,
  setCollapsed,
  headerText,
  indexTextRef,
}: CollapsibleButtonProps) => (
  <Button
    type="dark"
    isClicked={isCollapsed}
    width="100%"
    summary={true}
    onClick={() => setCollapsed((prev) => !prev)}
    center
    className={styles.button}
  >
    <BedrockText
      type="p"
      text={indexTextRef ? `${indexTextRef}. ${headerText}` : headerText}
      textAlign="left"
      color="white"
      extraClassName={styles.buttonText}
    />
    <BedrockText
      type="p"
      text={isCollapsed ? "-" : "+"}
      color="white"
    />
  </Button>
);
