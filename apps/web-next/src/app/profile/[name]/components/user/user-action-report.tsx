"use client";

import { PopupReport } from "@/_components/popup/popup-report";
import { PopupWrapper } from "@/_components/popup/popup-wrapper";
import { SimpleButton } from "@/_components/simple-button";
import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";

import { styles } from ".";

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
