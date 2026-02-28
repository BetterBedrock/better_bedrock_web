import Exit from "@/public/images/exit.png";
import { Children, FC, Fragment, HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { SimpleButton } from "@/shared/ui/simple-button";
import { useFocusTrap } from "@/features/popup/lib/hooks/useFocusTrap";

import styles from "./popup.module.scss";
import { Card } from "@/shared/ui/card";
import Image from "next/image";

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  title?: string;
  onClose?: () => void;
}

interface PopupComponent extends FC<PopupProps> {
  Body: FC<PopupWrapperProps>;
  Part: FC<PopupWrapperProps>;
  Item: FC<PopupWrapperProps>;
  Footer: FC<PopupWrapperProps>;
}

export const Popup = (({ children, onClose, title }: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useFocusTrap(popupRef);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={styles.popup} onClick={onClose}>
      <div ref={popupRef} className={styles.body} onClick={(e) => e.stopPropagation()}>
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
                type="p"
                color="white"
                textAlign="center"
              />
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}) as PopupComponent;

interface PopupWrapperProps {
  children: ReactNode;
}

const PopupBody = ({ children }: PopupWrapperProps) => (
  <Card negativeMarginBottom>
    {Children.toArray(children).map((c, i) => (
      <Fragment key={i}>
        {i !== 0 && <Card.Divider />}
        {c}
      </Fragment>
    ))}
  </Card>
);

PopupBody.displayName = "Popup.Body";

const PopupPart = ({ children }: PopupWrapperProps) => (
  <Card.Body>
    <div className={styles.part}>{children}</div>
  </Card.Body>
);
PopupPart.displayName = "Popup.Part";

const PopupItem = ({ children }: PopupWrapperProps) => (
  <div className={styles.item}>{children}</div>
);
PopupItem.displayName = "Popup.Item";

const PopupFooter = ({ children }: PopupWrapperProps) => (
  <Card sub>
    <Card.Body>
      <div className={styles.part}>{children}</div>
    </Card.Body>
  </Card>
);
PopupFooter.displayName = "Popup.Footer";

Popup.Body = PopupBody;
Popup.Part = PopupPart;
Popup.Item = PopupItem;
Popup.Footer = PopupFooter;
