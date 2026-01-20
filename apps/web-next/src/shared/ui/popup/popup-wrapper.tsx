"use client"

import { ReactNode, useState } from "react";
import { styles } from ".";
import clsx from "clsx";

export interface BasePopupWrapperProps {
  close: () => void;
}

interface PopupWrapperProps {
  children: ReactNode;
  className?: string;
  ignore?: boolean;
  popup: (close: () => void) => ReactNode;
}

export const PopupWrapper = ({ children, popup, className, ignore }: PopupWrapperProps) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (ignore) return;
    setOpen(true);
  };

  return (
    <div className={clsx(styles.wrapper, className && className)}>
      <div onClick={handleOpen} className={styles.selectable}>
        {children}
      </div>
      {open && popup(close)}
    </div>
  );
};
