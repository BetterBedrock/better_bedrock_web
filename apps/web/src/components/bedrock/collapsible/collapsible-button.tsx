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
    onClick={() => setCollapsed((prev) => !prev)}
  >
    <div className={styles.button}>
      <div style={{ display: "flex" }}>
        {/* Is this div even needed? */}
        <BedrockText
          type="p"
          text={indexTextRef ? `${indexTextRef}. ${headerText}` : headerText}
          textAlign="left"
          color="white"
          extraClassName={styles.buttonText}
        />
      </div>
      <BedrockText type="p" text={isCollapsed ? "-" : "+"} color="white" />
    </div>
  </Button>
);
