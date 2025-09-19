import { Card } from "~/components/bedrock/card";
import { styles } from ".";
import clsx from "clsx";
import Exit from "~/assets/images/exit.png";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { SimpleButton } from "~/components/bedrock/simple-button";
import { ReactNode } from "react";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  onClose?: () => void;
}

export const Popup = ({ children, onClose, className, title }: PopupProps) => (
  <div className={styles.popup} onClick={onClose}>
    <Card
      className={clsx(styles.body, className && className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.header}>
        <SimpleButton onClick={onClose} transparent className={styles.close}>
          <img alt="Close" src={Exit} className={styles.icon} />
        </SimpleButton>
        {title && (
          <BedrockText text={title} font="Minecraft" type="h2" color="white" textAlign="center" />
        )}
      </div>
      {children}
    </Card>
  </div>
);

interface PopupWrapperProps {
  children: ReactNode;
}

Popup.Wrapper = ({ children }: PopupWrapperProps) => (
  <div className={styles.container}>{children}</div>
);

Popup.Part = ({ children }: PopupWrapperProps) => <div className={styles.part}>{children}</div>;