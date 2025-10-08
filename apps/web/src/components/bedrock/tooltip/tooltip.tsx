import React, { CSSProperties, ReactNode, useState } from "react";
import { styles } from ".";
import clsx from "clsx";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TooltipProps {
  children: ReactNode;
  text?: string;
  className?: string;
  hidden?: boolean;
}

export const Tooltip = ({ children, className, text, hidden = false }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const tooltipStyle: CSSProperties = {
    position: "fixed",
    top: position.y + 12,
    left: position.x + 12,
    pointerEvents: "none",
    opacity: visible ? 1 : 0,
    transform: visible ? "translate(0, 0)" : "translate(-50%, -10px)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    zIndex: 1000,
  };

  return (
    <div
      className={clsx(styles.tooltip, className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {!hidden && (
        <div style={tooltipStyle} className={styles.box}>
          <BedrockText
            text={text ?? "Tooltip text"}
            extraClassName={styles.text}
            color="white"
            type="p"
            textAlign="center"
          />
        </div>
      )}
    </div>
  );
};
