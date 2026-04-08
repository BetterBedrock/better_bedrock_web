import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup";
import Image from "next/image";
import { ReactNode } from "react";

import styles from "./mod-card-actions.module.scss";

interface ModCardActionsToggleProps {
  popup: (close: () => void) => ReactNode;
}

export const ModCardActionsSettings = ({
  popup,
}: ModCardActionsToggleProps) => (
  <div>
    <PopupWrapper popup={popup}>
      <Button type="dark" center>
        <Image
          width={16}
          height={16}
          src="/images/settings_glyph.png"
          alt="Settings"
          unoptimized
          className={styles.pixalated}
        />
      </Button>
    </PopupWrapper>
  </div>
);
