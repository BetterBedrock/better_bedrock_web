import { ReactNode, useState } from "react";
import { styles } from ".";
import React from "react";

export interface BasePopupWrapperProps {
  close: () => void;
}

interface PopupWrapperProps {
  children: ReactNode;
  popup: (close: () => void) => ReactNode;
}

export const PopupWrapper = ({ children, popup }: PopupWrapperProps) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.confirmation}>
      <div onClick={handleOpen} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {open && popup(close)}
    </div>
  );
};
