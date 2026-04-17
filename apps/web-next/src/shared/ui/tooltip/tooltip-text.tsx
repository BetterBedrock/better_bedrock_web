import { BedrockText } from "@/shared/ui/bedrock-text";
import { CSSProperties } from "react";

import styles from "./tooltip.module.scss";

interface TooltipTextProps {
  tooltipStyle: CSSProperties;
  text?: string;
}

export const TooltipText = ({ tooltipStyle, text }: TooltipTextProps) => (
  <div style={tooltipStyle} className={styles.box}>
    <BedrockText
      text={text ?? "Tooltip text"}
      extraClassName={styles.text}
      color="white"
      type="p"
      textAlign="center"
    />
  </div>
);
