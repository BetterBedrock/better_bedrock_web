"use client";

import { PopupWrapper } from "@/shared/ui/popup";
import { SimpleButton } from "@/shared/ui/simple-button";
import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";

import styles from "./user.module.scss";
import { PopupReport } from "@/features/report";
import Image from "next/image";

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
      <Image
        height={24}
        width={16}
        unoptimized
        src={ReportGlyph.src}
        className={styles.report}
        alt="Report Glyph Button"
      />
    </SimpleButton>
  </PopupWrapper>
);
