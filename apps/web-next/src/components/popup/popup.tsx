import clsx from "clsx";
import Exit from "@/public/images/exit.png";
import { FC, HTMLAttributes, ReactNode } from "react";
import { BedrockText } from "@/components/bedrock-text";
import { Card } from "@/components/card";
import { SimpleButton } from "@/components/simple-button";

import { styles } from ".";

interface PopupComponent extends FC<PopupProps> {
  Part: FC<PopupWrapperProps>;
  Wrapper: FC<PopupWrapperProps>;
}

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  title?: string;
  onClose?: () => void;
}

export const Popup = (({ children, onClose, className, title }: PopupProps) => (
  <div className={styles.popup} onClick={onClose}>
    <Card
      className={clsx(styles.body, className && className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.header}>
        <SimpleButton onClick={onClose} transparent className={styles.close}>
          <img alt="Close" src={Exit.src} className={styles.icon} />
        </SimpleButton>
        {title && (
          <BedrockText
            text={title}
            font="Minecraft"
            type="h3"
            color="white"
            textAlign="center"
          />
        )}
      </div>
      {children}
    </Card>
  </div>
)) as PopupComponent;

interface PopupWrapperProps {
  children: ReactNode;
}

Popup.Wrapper = ({ children }: PopupWrapperProps) => (
  <div className={styles.container}>{children}</div>
);

Popup.Part = ({ children }: PopupWrapperProps) => (
  <div className={styles.part}>{children}</div>
);

Popup.Wrapper.displayName = "Popup.Wrapper";
Popup.Part.displayName = "Popup.Part";
