import Exit from "@/public/images/exit.png";
import { FC, HTMLAttributes, ReactNode } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { SimpleButton } from "@/shared/ui/simple-button";

import styles from "./popup.module.scss";
import { Card, CardBody } from "@/shared/ui/card";
import Image from "next/image";

interface PopupComponent extends FC<PopupProps> {
  Part: FC<PopupWrapperProps>;
  Footer: FC<PopupWrapperProps>;
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
    <div className={styles.body} onClick={(e) => e.stopPropagation()}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <SimpleButton onClick={onClose} transparent className={styles.close}>
            <Image
              width={25}
              height={25}
              unoptimized
              alt="Close Icon"
              src={Exit.src}
              className={styles.icon}
            />
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
  <Card negativeMarginBottom>
    <CardBody>
      <div className={styles.part}>{children}</div>
    </CardBody>
  </Card>
);

Popup.Footer = ({ children }: PopupWrapperProps) => (
  <Card sub>
    <CardBody>
      <div className={styles.part}>{children}</div>
    </CardBody>
  </Card>
);

Popup.Wrapper.displayName = "Popup.Wrapper";
Popup.Part.displayName = "Popup.Part";
Popup.Footer.displayName = "Popup.Footer";
