import clsx from "clsx";
import Exit from "@/public/images/exit.png";
import { FC, HTMLAttributes, ReactNode } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";
import { SimpleButton } from "@/shared/ui/simple-button";

import styles from "./popup.module.scss";

interface PopupComponent extends FC<PopupProps> {
  Part: FC<PopupWrapperProps>;
  Wrapper: FC<PopupWrapperProps>;
  Content: FC<PopupWrapperProps>;
}

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  title?: string;
  onClose?: () => void;
}

export const Popup = (({ children, onClose, className, title }: PopupProps) => (
  <div className={styles.popup} onClick={onClose}>
    <div className={styles.body} onClick={(e) => e.stopPropagation()}>
      <div className={styles.headerContainer}>
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
      </div>
      {children}
    </div>
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

Popup.Content = ({ children }: PopupWrapperProps) => (
  <div className={styles.content}>{children}</div>
);

Popup.Wrapper.displayName = "Popup.Wrapper";
Popup.Part.displayName = "Popup.Part";
Popup.Content.displayName = "Popup.Content";
