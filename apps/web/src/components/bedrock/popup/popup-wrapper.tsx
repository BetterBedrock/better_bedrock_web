import { ReactNode, useState } from "react";
import { styles } from ".";
import React from "react";

export interface BasePopupWrapperProps {
  close: () => void;
}

interface PopupWrapperProps {
  children: ReactNode;
  ignore?: boolean;
  popup: (close: () => void) => ReactNode;
}

export const PopupWrapper = ({ children, popup, ignore }: PopupWrapperProps) => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if(ignore) return;
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
