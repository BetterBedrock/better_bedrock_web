import { BedrockText } from "@/components/bedrock-text";
import { ButtonType, Button } from "@/components/button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { styles } from ".";

interface CollapsibleButtonProps {
  indexTextRef?: string | number;
  headerText: string;
  type: ButtonType;
  isCollapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
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
      type="p"
      text={indexTextRef ? `${indexTextRef}. ${headerText}` : headerText}
      textAlign="left"
      color={type === "white" ? "black" : "white"}
      extraClassName={styles.buttonText}
    />
    <Image
      src={isCollapsed ? "/images/arrow_up.png" : "/images/arrow_down.png"}
      alt={isCollapsed ? "Collapse" : "Expand"}
      width={21}
      height={12}
      style={{ flexShrink: 0 }}
    />
  </Button>
);
