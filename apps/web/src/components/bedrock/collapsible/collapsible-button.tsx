import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { Button, ButtonType } from "~/components/bedrock/button";

interface CollapsibleButtonProps {
  indexTextRef?: string | number;
  headerText: string;
  type: ButtonType;
  isCollapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollapsibleButton = ({
  isCollapsed,
  setCollapsed,
  headerText,
  indexTextRef,
  type,
}: CollapsibleButtonProps) => (
  <Button
    isClicked={isCollapsed}
    width="100%"
    summary={true}
    type={type}
    onClick={() => setCollapsed((prev) => !prev)}
    center
    className={styles.button}
  >
    <BedrockText
      type="h1"
      text={indexTextRef ? `${indexTextRef}. ${headerText}` : headerText}
      textAlign="left"
      color={type === "white" ? "black" : "white"}
      extraClassName={styles.buttonText}
    />
    <BedrockText
      type="p"
      text={isCollapsed ? "-" : "+"}
      color={type === "white" ? "black" : "white"}
    />
  </Button>
);
