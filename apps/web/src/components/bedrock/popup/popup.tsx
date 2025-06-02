import { Card } from "~/components/bedrock/card";
import { styles } from ".";
import clsx from "clsx";
import Exit from "~/assets/images/exit.png";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Popup = ({ children, onClose, className }: PopupProps) => (
  <div className={styles.popup} onClick={onClose}>
    <Card
      className={clsx(styles.body, className && className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.header}>
        <img alt="Close" src={Exit} className={styles.close} onClick={onClose} />
      </div>
      {children}
    </Card>
  </div>
);
