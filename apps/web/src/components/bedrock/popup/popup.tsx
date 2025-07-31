import { Card } from "~/components/bedrock/card";
import { styles } from ".";
import clsx from "clsx";
import Exit from "~/assets/images/exit.png";
import { BedrockText } from "~/components/bedrock/bedrock-text";

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
        <img alt="Close" src={Exit} className={styles.close} onClick={onClose} />
        {title && (
          <BedrockText text={title} font="MinecraftTen" type="h2" color="white" textAlign="center" />
        )}
      </div>
      {children}
    </Card>
  </div>
);
