import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";

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
    type="alwaysBlack"
    isClicked={isCollapsed}
    width="100%"
    // text=""
    onTap={() => setCollapsed((prev) => !prev)}
  >
    <div className={styles.button}>
      <div style={{ display: "flex" }}> {/* Is this div even needed? */}
        <BedrockText
          type="p"
          text={indexTextRef ? `${indexTextRef}. ${headerText}` : headerText}
          textAlign="left"
          extraClassName={styles.buttonText}
        />
      </div>
      <BedrockText type="p" text={isCollapsed ? "-" : "+"} />
    </div>
  </Button>
);
