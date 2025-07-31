import { CSSProperties, ReactNode } from "react";
import { styles } from ".";
import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TooltipProps {
  children: ReactNode;
  text?: string;
  className?: string;
  style: CSSProperties;
}

export const Tooltip = ({ children, className, text, style }: TooltipProps) => (
  <div className={clsx(styles.tooltip, className && className)} style={style}>
    {children}
    <BedrockText extraClassName={styles.text} text={text ?? "Tooltip text"} color="white" type="p" textAlign="center" />
    {/* <span className={styles.text}>Tooltip text</span> */}
  </div>
);
