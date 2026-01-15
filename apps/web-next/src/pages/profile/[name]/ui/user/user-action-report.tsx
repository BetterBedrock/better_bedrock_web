"use client";

import { PopupReport } from "@/shared/ui/popup/popup-report";
import { PopupWrapper } from "@/shared/ui/popup/popup-wrapper";
import { SimpleButton } from "@/shared/ui/simple-button";
import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";

import styles from "./user.module.scss";

interface UserActionReportProps {
  name: string;
  id: string;
}

export const UserActionReport = ({ name, id }: UserActionReportProps) => (
  <PopupWrapper
    popup={(close) => (
      <PopupReport name={name} id={id} type="user" onClose={close} />
    )}
  >
    <SimpleButton transparent>
      <img src={ReportGlyph.src} className={styles.report} />
    </SimpleButton>
  </PopupWrapper>
);
